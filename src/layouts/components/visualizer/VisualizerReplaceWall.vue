<script setup lang="ts">
import * as cv from '@techstark/opencv-js'
import localForage from 'localforage'

const image = ref(null)
const shape = ref(null)
const preview = ref(null)
const canvasRef = ref(null)
const canvasRefs = ref(null)

const drawImageToCanvas = imageElement => {
  const canvas = document.createElement('canvas')

  canvas.width = imageElement.naturalWidth
  canvas.height = imageElement.naturalHeight

  const ctx = canvas.getContext('2d')

  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height)

  return canvas
}

const createSeamlessTile = (srcImage, numTiles = 5) => {
  const finalRows = srcImage.rows * numTiles
  const finalCols = srcImage.cols * numTiles
  const tiledImage = new cv.Mat.zeros(finalRows, finalCols, srcImage.type())

  // Fill the tiled image with mirrored copies
  for (let i = 0; i < numTiles; i++) {
    for (let j = 0; j < numTiles; j++) {
      const srcRegion = srcImage.clone()
      if (i % 2 === 1) { // Mirror vertically
        cv.flip(srcRegion, srcRegion, 0)
      }
      if (j % 2 === 1) { // Mirror horizontally
        cv.flip(srcRegion, srcRegion, 1)
      }

      const destRegion = tiledImage.rowRange(i * srcImage.rows, (i + 1) * srcImage.rows)
        .colRange(j * srcImage.cols, (j + 1) * srcImage.cols)

      srcRegion.copyTo(destRegion)
      srcRegion.delete()
      destRegion.delete()
    }
  }

  return tiledImage
}

const findRectangleCorners = rectangle => {
  const points = cv.RotatedRect.points(rectangle)

  const top = 0 - Math.min(...points.map(c => c.y))
  const left = 0 - Math.min(...points.map(c => c.x))

  if (top !== 0)
    points.forEach(c => c.y += top)

  if (left !== 0)
    points.forEach(c => c.x += left)

  return points
}

const warpPerspective = (img, rectangle) => {
  // Tile the overlay
  const boundingRect = cv.RotatedRect.boundingRect(rectangle)
  const angle = rectangle.angle
  const widthTiles = Math.ceil(boundingRect.width / img.cols)
  const heightTiles = Math.ceil(boundingRect.height / img.rows)
  let tiles = Math.max(widthTiles, heightTiles)

  if (tiles <= 3)
    tiles = tiles * 3
  else if (tiles <= 6)
    tiles = tiles * 2

  const tileImage = createSeamlessTile(img, tiles)

  // Define the source points (corners of the original wall)
  const srcPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, boundingRect.width, 0, 0, boundingRect.height, boundingRect.width, boundingRect.height])

  // Define the destination points (corners of the transformed wall)
  let vertices = findRectangleCorners(rectangle)
  console.log(angle)
  console.log(JSON.stringify(vertices))
  if (angle <= 30)
    vertices = [vertices[1], vertices[2], vertices[0], vertices[3]]
  else if (angle <= 90)
    vertices = [vertices[0], vertices[1], vertices[3], vertices[2]]
  console.log(JSON.stringify(vertices))

  const dstPoints = cv.matFromArray(4, 1, cv.CV_32FC2, vertices.map(v => [v.x, v.y]).flat())

  // Calculate the perspective transform matrix
  const perspectiveMatrix = cv.getPerspectiveTransform(srcPoints, dstPoints)

  // Create an output image for the transformed result
  const transformedImage = new cv.Mat()

  // Apply the perspective transform to the input image
  cv.warpPerspective(tileImage, transformedImage, perspectiveMatrix, tileImage.size(), cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar())

  // Release memory
  tileImage.delete()
  srcPoints.delete()
  dstPoints.delete()
  perspectiveMatrix.delete()

  return transformedImage
}

const createSegmentationMask = (baseImage, segmentationPath) => {
  const canvas = document.createElement('canvas')

  canvas.width = baseImage.naturalWidth
  canvas.height = baseImage.naturalHeight

  const ctx = canvas.getContext('2d')

  ctx.beginPath()
  segmentationPath.forEach((point, index) => {
    if (index === 0)
      ctx.moveTo(point.x, point.y)
    else
      ctx.lineTo(point.x, point.y)
  })
  ctx.closePath()

  ctx.fillStyle = 'white'
  ctx.fill()

  return cv.imread(canvas)
}

const findShapeRectangle = src => {
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0)
  cv.threshold(src, src, 177, 200, cv.THRESH_BINARY)

  const contours = new cv.MatVector()
  const hierarchy = new cv.Mat()

  cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)

  const cnt = contours.get(0)

  const result = cv.minAreaRect(cnt)

  contours.delete()
  hierarchy.delete()
  cnt.delete()

  return result
}

const replaceImage = (wallImage, overlayImage, rectangle, points) => {
  const minX = Math.min(...points.map(p => p.x))
  const maxX = Math.max(...points.map(p => p.x))
  const minY = Math.min(...points.map(p => p.y))
  const maxY = Math.max(...points.map(p => p.y))

  // Calculate target width, height, and aspect ratio
  const targetWidth = maxX - minX
  const targetHeight = maxY - minY
  const targetAspectRatio = targetWidth / targetHeight

  // Overlay image aspect ratio
  const overlayAspectRatio = overlayImage.cols / overlayImage.rows

  // Determine scaling factor and resized dimensions
  let scale, resizedWidth, resizedHeight
  if (overlayAspectRatio > targetAspectRatio) {
    // Overlay is wider than target area
    scale = targetHeight / overlayImage.rows
    resizedWidth = overlayImage.cols * scale
    resizedHeight = targetHeight
  }
  else {
    // Overlay is taller than target area
    scale = targetWidth / overlayImage.cols
    resizedWidth = targetWidth
    resizedHeight = overlayImage.rows * scale
  }

  if (rectangle.angle > 0) {
    resizedWidth = resizedWidth * 1.25
    resizedHeight = resizedHeight * 1.25
  }

  // Create a mask
  const mask = new cv.Mat.zeros(wallImage.rows, wallImage.cols, cv.CV_8UC1)

  // Convert points to cv format
  const contour = cv.matFromArray(points.length, 1, cv.CV_32SC2, points.flatMap(p => [p.x, p.y]))
  const contours = new cv.MatVector()

  contours.push_back(contour)

  // Fill the mask with white in the area of the shape
  cv.fillPoly(mask, contours, new cv.Scalar(255, 255, 255, 255))

  // Resize the overlay image
  const resizedOverlay = new cv.Mat()
  const dsize = new cv.Size(resizedWidth, resizedHeight)

  cv.resize(overlayImage, resizedOverlay, dsize, 0, 0, cv.INTER_AREA)

  // Create a grayscale version of the wall image
  const grayWall = new cv.Mat()

  cv.cvtColor(wallImage, grayWall, cv.COLOR_RGBA2GRAY)
  cv.cvtColor(grayWall, grayWall, cv.COLOR_GRAY2RGBA)

  // Blend the region on the wall image
  let startX = minX
  let startY = minY

  if (rectangle.angle > 0) {
    startX = startX - ((maxX * 0.15) / 2)
    startY = startY - ((maxY * 0.15) / 2)
  }

  for (let row = 0; row < resizedOverlay.rows; row++) {
    for (let col = 0; col < resizedOverlay.cols; col++) {
      // Check if the pixel is within the masked area
      if (mask.ucharPtr(startY + row, startX + col)[0] === 255) {
        const overlayPixel = resizedOverlay.ucharPtr(row, col)
        const grayPixel = grayWall.ucharPtr(startY + row, startX + col)
        const wallPixel = wallImage.ucharPtr(startY + row, startX + col)

        // Blend the grayscale texture with the overlay color
        for (let channel = 0; channel < wallImage.channels(); channel++) {
          if (channel < 3) { // For RGB channels
            wallPixel[channel] = overlayPixel[channel] * overlayPixel[3] / 255 + grayPixel[channel] * (1 - overlayPixel[3] / 255)
          }
          else { // For alpha channel
            wallPixel[channel] = overlayPixel[channel]
          }
        }
      }
    }
  }

  updateCanvas(wallImage)

  // Clean up
  grayWall.delete()
  contour.delete()
  contours.delete()
  mask.delete()
  resizedOverlay.delete()
  wallImage.delete()
  overlayImage.delete()
}

const changeWall = async (stone: any) => {
  const wallImageElement = new Image()
  const overlayImageElement = new Image()

  wallImageElement.src = image.value.image
  overlayImageElement.src = stone.image

  await Promise.all([
    new Promise(resolve => wallImageElement.onload = resolve),
    new Promise(resolve => overlayImageElement.onload = resolve),
  ])

  const wallCanvas = drawImageToCanvas(wallImageElement)
  const stoneCanvas = drawImageToCanvas(overlayImageElement)

  const wallImage = cv.imread(wallCanvas)
  const overlayImage = cv.imread(stoneCanvas)

  const points = shape.value
  const segmentationMask = createSegmentationMask(document.getElementById('baseImage'), points)
  const rectangle = findShapeRectangle(segmentationMask)
  const warpedOverlayImage = warpPerspective(overlayImage, rectangle)

  replaceImage(wallImage, warpedOverlayImage, rectangle, points)

  canvasRefs.value.classList.add('d-none')
}

onMounted(async () => {
  try {
    const storedImage = await localForage.getItem('visualizeImage')

    image.value = storedImage ? JSON.parse(storedImage) : null
    preview.value = image.value ? image.value.image : null

    const storedShape = await localForage.getItem('selectedWall')

    shape.value = storedShape ? JSON.parse(storedShape) : null

    drawShapes()
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
})

function updateCanvas(visualizeImage) {
  const canvas = canvasRef.value
  if (!canvas || !visualizeImage)
    return

  // Set canvas size to match the visualizeImage
  canvas.width = visualizeImage.cols
  canvas.height = visualizeImage.rows

  // Draw the visualizeImage onto the canvas
  cv.imshow(canvas, visualizeImage)

  // Convert canvas content to base64 image string
  preview.value = canvas.toDataURL('image/png')

  image.value.image = preview.value

  if (visualizeImage) {
    localForage.setItem('visualizeImage', JSON.stringify(image.value))
      .catch(error => console.error('Error saving image:', error))
  }
}

defineExpose({ changeWall })

const scaleShapeCoordinates = (shape, scaleX, scaleY) => {
  return shape.map(point => ({
    x: point.x * scaleX,
    y: point.y * scaleY,
  }))
}

const drawShapeOnCanvas = (canvas, shape) => {
  const context = canvas.getContext('2d')

  let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity
  shape.forEach(point => {
    minX = Math.min(minX, point.x)
    minY = Math.min(minY, point.y)
    maxX = Math.max(maxX, point.x)
    maxY = Math.max(maxY, point.y)
  })

  const width = maxX - minX
  const height = maxY - minY

  canvas.width = width
  canvas.height = height

  canvas.style.left = `${minX}px`
  canvas.style.top = `${minY}px`

  context.clearRect(0, 0, width, height)

  context.fillStyle = 'rgba(26, 78, 25, 1)'

  context.beginPath()
  shape.forEach((point, index) => {
    const x = point.x - minX
    const y = point.y - minY
    if (index === 0)
      context.moveTo(x, y)
    else context.lineTo(x, y)
  })
  context.closePath()
  context.fill()
}

const drawShapes = () => {
  const imgElement = document.querySelector('.image-container img')
  if (!imgElement)
    return

  const scaleX = imgElement.clientWidth / imgElement.naturalWidth
  const scaleY = imgElement.clientHeight / imgElement.naturalHeight

  const scaledShape = scaleShapeCoordinates(shape.value, scaleX, scaleY)
  if (canvasRefs.value)
    drawShapeOnCanvas(canvasRefs.value, scaledShape)
}
</script>

<template>
  <div class="d-flex justify-center">
    <div class="image-container">
      <img
        v-if="image"
        id="baseImage"
        :src="preview"
        class="img-background"
      >
      <canvas
        ref="canvasRefs"
        class="shape-canvas"
      />
      <canvas
        ref="canvasRef"
        style="display: none;"
      />
    </div>
  </div>
</template>

<style lang="scss">
.image-container {
  position: relative;

  img {
    border-radius: 10px;
    block-size: auto;
    inline-size: 100%;
  }
}

.shape-canvas {
  position: absolute;
  z-index: 1;
  inset-block-start: 0;
  inset-inline-start: 0;
  opacity: 0.7;
}
</style>

<script setup lang="ts">
import * as cv from '@techstark/opencv-js'
import localForage from 'localforage'
import SnackBar from '../SnackBar.vue'

const image = ref(null)
const shape = ref(null)
const preview = ref(null)
const canvasRef = ref(null)
const SnackBarRef = ref(null)

const drawImageToCanvas = imageElement => {
  const canvas = document.createElement('canvas')

  canvas.width = imageElement.naturalWidth
  canvas.height = imageElement.naturalHeight

  const ctx = canvas.getContext('2d')

  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height)

  return canvas
}

const createSeamlessTile = (srcImage, numTiles = 8) => {
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

  const tileImage = createSeamlessTile(img, Math.max(widthTiles, heightTiles))

  // const tileImage = createSeamlessTile(img)

  // Define the source points (corners of the original wall)
  const srcPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, boundingRect.width, 0, 0, boundingRect.height, boundingRect.width, boundingRect.height])

  // Define the destination points (corners of the transformed wall)
  let vertices = findRectangleCorners(rectangle)
  if (angle < 10)
    vertices = [vertices[1], vertices[2], vertices[0], vertices[3]]
  else if (angle < 20)
    vertices = [vertices[1], vertices[2], vertices[0], vertices[3]]
  else if (angle < 90)
    vertices = [vertices[0], vertices[1], vertices[3], vertices[2]]

  console.log(vertices)
  console.log(angle)

  const dstPoints = cv.matFromArray(4, 1, cv.CV_32FC2, vertices.map(v => [v.x, v.y]).flat())

  // Calculate the perspective transform matrix
  const perspectiveMatrix = cv.getPerspectiveTransform(srcPoints, dstPoints)

  // Create an output image for the transformed result
  const transformedImage = new cv.Mat()
  const canvas = document.createElement('canvas')

  // Apply the perspective transform to the input image
  cv.warpPerspective(tileImage, transformedImage, perspectiveMatrix, tileImage.size(), cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar())

  // Display the result or use the transformedImage as needed
  cv.imshow(canvas, transformedImage)

  // Release memory
  tileImage.delete()
  srcPoints.delete()
  dstPoints.delete()
  perspectiveMatrix.delete()
  transformedImage.delete()

  console.log(canvas.toDataURL())

  return cv.imread(canvas)
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

  console.log(canvas.toDataURL())

  return cv.imread(canvas)
}

const findShapeRectangle = src => {
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0)
  cv.threshold(src, src, 177, 200, cv.THRESH_BINARY)

  const contours = new cv.MatVector()
  const hierarchy = new cv.Mat()

  cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)

  const cnt = contours.get(0)

  return cv.minAreaRect(cnt)
}

const replaceImage = (wallImage, overlayImage, points) => {
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
  const dsize = new cv.Size(resizedWidth * 2, resizedHeight * 2)

  cv.resize(overlayImage, resizedOverlay, dsize, 0, 0, cv.INTER_AREA)

  // Create a grayscale version of the wall image
  const grayWall = new cv.Mat()

  cv.cvtColor(wallImage, grayWall, cv.COLOR_RGBA2GRAY)
  cv.cvtColor(grayWall, grayWall, cv.COLOR_GRAY2RGBA)

  // Blend the region on the wall image
  const startX = minX - (maxX / 3)
  const startY = minY - (maxY / 3)

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

  replaceImage(wallImage, warpedOverlayImage, points)
  SnackBarRef.value.show('success', 'Wall Replaced')
}

onMounted(async () => {
  try {
    const storedImage = await localForage.getItem('visualizeImage')

    image.value = storedImage ? JSON.parse(storedImage) : null
    preview.value = image.value ? image.value.image : null

    const storedShape = await localForage.getItem('selectedWall')

    shape.value = storedShape ? JSON.parse(storedShape) : null
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
        ref="canvasRef"
        style="display: none;"
      />

      <canvas ref="trialCanvas" />
    </div>
    <SnackBar ref="SnackBarRef" />
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
</style>

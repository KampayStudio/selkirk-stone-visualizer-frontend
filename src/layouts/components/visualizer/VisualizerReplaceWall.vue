<script setup lang="ts">
import * as cv from '@techstark/opencv-js'
import localForage from 'localforage'

const image = ref(null)
const shape = ref(null)
const preview = ref(null)
const canvasRef = ref(null)

const drawImageToCanvas = imageElement => {
  const canvas = document.createElement('canvas')

  canvas.width = imageElement.width
  canvas.height = imageElement.height

  const ctx = canvas.getContext('2d')

  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height)

  return canvas
}

const createSeamlessTile = (srcImage, numTiles = 5) => {
  // Calculate the final size of the tiled image
  const finalRows = srcImage.rows * numTiles
  const finalCols = srcImage.cols * numTiles
  const tiledImage = new cv.Mat.zeros(finalRows, finalCols, srcImage.type())

  // Fill the tiled image with mirrored copies of the source image
  for (let i = 0; i < numTiles; i++) {
    for (let j = 0; j < numTiles; j++) {
      const srcRegion = srcImage.clone()
      if (i % 2 === 1) { // Mirror vertically
        cv.flip(srcRegion, srcRegion, 0)
      }
      if (j % 2 === 1) { // Mirror horizontally
        cv.flip(srcRegion, srcRegion, 1)
      }

      // Define the destination region
      const destRegion = tiledImage.rowRange(i * srcImage.rows, (i + 1) * srcImage.rows)
        .colRange(j * srcImage.cols, (j + 1) * srcImage.cols)

      // Copy the source region to the destination region
      srcRegion.copyTo(destRegion)
      srcRegion.delete() // Free memory of the temporary source region
    }
  }

  return tiledImage
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

  // Tile the overlay
  const tileImage = createSeamlessTile(overlayImage)

  // Convert points to cv format
  const contour = cv.matFromArray(points.length, 1, cv.CV_32SC2, points.flatMap(p => [p.x, p.y]))
  const contours = new cv.MatVector()

  contours.push_back(contour)

  // Fill the mask with white in the area of the shape
  cv.fillPoly(mask, contours, new cv.Scalar(255, 255, 255, 255))

  // Resize the overlay image
  const resizedOverlay = new cv.Mat()
  const dsize = new cv.Size(resizedWidth, resizedHeight)

  cv.resize(tileImage, resizedOverlay, dsize, 0, 0, cv.INTER_AREA)

  // Create a grayscale version of the wall image
  const grayWall = new cv.Mat()

  cv.cvtColor(wallImage, grayWall, cv.COLOR_RGBA2GRAY)
  cv.cvtColor(grayWall, grayWall, cv.COLOR_GRAY2RGBA)

  // Blend the region on the wall image
  const startX = minX
  const startY = minY

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
  tileImage.delete()
}

// const replaceImage = (wallImage, overlayImage, points) => {
//   // Calculate extreme points (bounding box) from the points array
//   const minX = Math.min(...points.map(p => p.x))
//   const maxX = Math.max(...points.map(p => p.x))
//   const minY = Math.min(...points.map(p => p.y))
//   const maxY = Math.max(...points.map(p => p.y))

//   // Define the destination points (corners of the bounding box)
//   const dstPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
//     minX,
//     minY, // top-left
//     maxX,
//     minY, // top-right
//     maxX,
//     maxY, // bottom-right
//     minX,
//     maxY, // bottom-left
//   ])

//   // Define the source points (corners of the overlay image)
//   const srcPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
//     0,
//     0,
//     overlayImage.cols,
//     0,
//     overlayImage.cols,
//     overlayImage.rows,
//     0,
//     overlayImage.rows,
//   ])

//   // Calculate the transformation matrix
//   const M = cv.getPerspectiveTransform(srcPoints, dstPoints)

//   // Warp the overlay image to fit the perspective of the wall
//   const warpedOverlay = new cv.Mat()

//   cv.warpPerspective(overlayImage, warpedOverlay, M, wallImage.size(), cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar())

//   // Create a mask from the original points
//   const mask = new cv.Mat.zeros(wallImage.rows, wallImage.cols, cv.CV_8UC1)
//   const contour = cv.matFromArray(points.length, 1, cv.CV_32SC2, points.flatMap(p => [p.x, p.y]))
//   const contours = new cv.MatVector()

//   contours.push_back(contour)
//   cv.fillPoly(mask, contours, new cv.Scalar(255, 255, 255, 255))

//   // Blend the warped overlay image onto the wall image using the mask
//   for (let row = 0; row < wallImage.rows; row++) {
//     for (let col = 0; col < wallImage.cols; col++) {
//       if (mask.ucharPtr(row, col)[0] === 255) {
//         for (let channel = 0; channel < wallImage.channels(); channel++)
//           wallImage.ucharPtr(row, col)[channel] = warpedOverlay.ucharPtr(row, col)[channel]
//       }
//     }
//   }

//   updateCanvas(wallImage)

//   // Clean up
//   srcPoints.delete()
//   dstPoints.delete()
//   M.delete()
//   warpedOverlay.delete()
//   mask.delete()
//   contour.delete()
//   contours.delete()
// }

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

  // Convert the canvas content to a cv.Mat object
  const wallImage = cv.imread(wallCanvas)
  const overlayImage = cv.imread(stoneCanvas)
  const points = shape.value

  // Your OpenCV processing logic here
  replaceImage(wallImage, overlayImage, points)
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
        :src="preview"
        class="img-background"
      >
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
</style>

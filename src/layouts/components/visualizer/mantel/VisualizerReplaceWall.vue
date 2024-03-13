<script setup lang="ts">
import * as cv from '@techstark/opencv-js'
import localForage from 'localforage'

const image = ref(null)
const shape = ref(null)
const preview = ref(null)
const canvasRef = ref(null)
const canvasRefs = ref(null)

onMounted(async () => {
  try {
    const storedImage = await localForage.getItem('visualizeImage')

    image.value = storedImage ? JSON.parse(storedImage) : null
    preview.value = image.value ? image.value.image : null

    const storedShape = await localForage.getItem('selectedWall')

    shape.value = storedShape ? JSON.parse(storedShape) : null

    drawShapes()

    console.log(getDominantAndAverageColor('https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1624496189388-O28QGAX38BXU0WVOT91Y/Rustic%2BBrown%2BCropped%2BSwatch.jpg?format=750w'))
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
})

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

const getDominantAndAverageColor = async imageUrl => {
  // Create an Image element
  const img = new Image()

  img.crossOrigin = 'Anonymous' // Address potential CORS issues

  // Wait for the image to load
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
    img.src = imageUrl
  })

  // Draw the loaded image onto a canvas
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0, img.width, img.height)

  // Use OpenCV.js to read the image data from the canvas
  const src = cv.imread(canvas)

  // Calculate the average color of the source image
  const meanColor = cv.mean(src)

  // Ensure src is in RGB color space
  let srcRGB = new cv.Mat()
  if (src.channels() === 4)
    cv.cvtColor(src, srcRGB, cv.COLOR_RGBA2RGB)
  else if (src.channels() === 1)
    cv.cvtColor(src, srcRGB, cv.COLOR_GRAY2RGB)
  else
    srcRGB = src.clone() // Ensure srcRGB is a separate Mat object

  // Proceed with the unchanged part of the function...
  const samples = srcRGB.reshape(3, srcRGB.cols * srcRGB.rows)

  const srcFlat = new cv.Mat(srcRGB.rows * srcRGB.cols, 1, cv.CV_32FC3)
  for (let i = 0; i < srcRGB.rows; i++) {
    for (let j = 0; j < srcRGB.cols; j++) {
      // Get the pixel value
      const pixelValue = srcRGB.ucharPtr(i, j) // For uchar images
      // Alternatively, for float images use: srcRGB.floatPtr(i, j);
      // Construct a Vec3f for the pixel
      const vec = new cv.Vec3f(pixelValue[0], pixelValue[1], pixelValue[2])

      // Assign the Vec3f to the flat matrix
      srcFlat.floatPtr(i * srcRGB.cols + j)[0] = vec
    }
  }
  const samples32f = new cv.Mat()

  samples.convertTo(samples32f, cv.CV_32F)

  // K-means parameters
  const clusterCount = 1 // We only want the dominant color
  const labels = new cv.Mat()
  const attempts = 5
  const criteria = new cv.TermCriteria(cv.TermCriteria_EPS + cv.TermCriteria_MAX_ITER, 100, 0.2)
  const centers = new cv.Mat()

  // Apply k-means
  cv.kmeans(samples32f, clusterCount, labels, criteria, attempts, cv.KMEANS_PP_CENTERS, centers)

  const dominantColor = centers.data32F.slice(0, 3) // The dominant color is the first center

  // Clean up
  src.delete()
  srcRGB.delete()
  samples.delete()
  samples32f.delete()
  labels.delete()
  centers.delete()

  return {
    averageColor: {
      r: meanColor[0],
      g: meanColor[1],
      b: meanColor[2],
    },
    dominantColor: {
      r: dominantColor[0],
      g: dominantColor[1],
      b: dominantColor[2],
    },
  }
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
        class="highlight"
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

.highlight {
  position: absolute;
  z-index: 1;
  inset-block-start: 0;
  inset-inline-start: 0;
  opacity: 0.7;
}
</style>

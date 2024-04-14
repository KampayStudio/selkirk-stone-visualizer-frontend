<script setup lang="ts">
import * as cv from '@techstark/opencv-js'
import localForage from 'localforage'
import Loading from '@/layouts/components/Loading.vue'

const image = ref(null)
const shape = ref(null)
const preview = ref(null)
const previewBNW = ref(null)
const previewHolder = ref(null)
const canvasRef = ref(null)
const canvasRefs = ref(null)
const LoadingRef = ref(null)

const imageUrl = ref('https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1624496189388-O28QGAX38BXU0WVOT91Y/Rustic%2BBrown%2BCropped%2BSwatch.jpg?format=700w') // Your image URL
const dominantColor = ref('')

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

onMounted(async () => {
  LoadingRef.value.triggerDialog(true)
  try {
    const storedImage = await localForage.getItem('visualizeImage')
    if (storedImage) {
      image.value = JSON.parse(storedImage)
      preview.value = image.value.image // Set original image URL

      // Load and convert image to black and white
      const imgElement = new Image()

      imgElement.onload = async () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = imgElement.width
        canvas.height = imgElement.height
        ctx.drawImage(imgElement, 0, 0)

        await convertToBlackAndWhite(canvas) // Apply B&W conversion

        previewBNW.value = canvas.toDataURL() // Set B&W image URL
        previewHolder.value = canvas.toDataURL()
      }
      imgElement.src = image.value.image
    }
    else {
      image.value = null
      preview.value = null
      previewBNW.value = null
    }

    const storedShape = await localForage.getItem('selectedWall')

    shape.value = storedShape ? JSON.parse(storedShape) : null

    // drawShapes()
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
  LoadingRef.value.triggerDialog(false)
})

const loadMantelAndFindDominantColor = async () => {
  const img = new Image()

  img.crossOrigin = 'Anonymous' // Needed for CORS images
  img.src = imageUrl.value
  await img.decode() // Ensure the image is loaded

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0)

  const { data } = ctx.getImageData(0, 0, img.width, img.height)
  const color = findDominantColor(data)

  // dominantColor.value = `rgb(${color.r}, ${color.g}, ${color.b})`
  dominantColor.value = color

  console.log(color)
}

const findDominantColor = (data: any) => {
  const colorCounts = {}
  const dominantColor = { color: '', count: 0 }

  for (let i = 0; i < data.length; i += 4) {
    const rgb = `${data[i]},${data[i + 1]},${data[i + 2]}`

    colorCounts[rgb] = (colorCounts[rgb] || 0) + 1
    if (colorCounts[rgb] > dominantColor.count) {
      dominantColor.color = rgb
      dominantColor.count = colorCounts[rgb]
    }
  }

  const [r, g, b] = dominantColor.color.split(',')

  return { r, g, b }
}

const loadMantelColor = async (mantelLink: any) => {
  LoadingRef.value.triggerDialog(true)

  imageUrl.value = mantelLink
  await loadMantelAndFindDominantColor()
  await applyColorToBNWImage()
  await maskPreviewBNWImageBasedOnShape()
  await mergePreviewAndBNWToPreview()
  console.log('Loading success')
  LoadingRef.value.triggerDialog(false)
}

const convertToBlackAndWhite = async canvas => {
  if (!cv || !cv.imread) {
    console.error('OpenCV.js is not loaded')

    return
  }

  // Convert the canvas image to a grayscale OpenCV image
  const src = cv.imread(canvas)
  const dst = new cv.Mat()

  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0)

  // Overwrite the original image with the grayscale image
  cv.imshow(canvas, dst)

  // Clean up OpenCV memory
  src.delete()
  dst.delete()
}

const applyColorToBNWImage = async () => {
  if (!previewBNW.value || !dominantColor.value) {
    console.error('Missing B&W preview or dominant color')

    return
  }

  // Create a new Image element from the B&W preview
  const imgElement = new Image()

  previewBNW.value = previewHolder.value
  imgElement.src = previewBNW.value
  await imgElement.decode()

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = imgElement.width
  canvas.height = imgElement.height

  ctx.drawImage(imgElement, 0, 0)

  ctx.globalCompositeOperation = 'multiply'

  ctx.fillStyle = hexToRGBA(dominantColor.value, 0.8)
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.globalCompositeOperation = 'source-over'

  previewBNW.value = canvas.toDataURL()
}

function hexToRGBA(hex, alpha = 1) {
  const r = hex.r
  const g = hex.g
  const b = hex.b

  console.log(r, g, b)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const maskPreviewBNWImageBasedOnShape = async () => {
  if (!previewBNW.value || !shape.value || shape.value.length === 0) {
    console.error('Missing B&W preview or shape data')

    return
  }

  // Load the B&W preview image
  const imgElement = new Image()

  imgElement.src = previewBNW.value
  await imgElement.decode() // Ensure the image is fully loaded

  // Prepare the canvas for drawing
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = imgElement.width
  canvas.height = imgElement.height

  // Define the clipping path based on the scaled shape
  const scaleX = canvas.width / imgElement.naturalWidth
  const scaleY = canvas.height / imgElement.naturalHeight
  const scaledShape = scaleShapeCoordinates(shape.value, scaleX, scaleY)

  ctx.beginPath()
  scaledShape.forEach((point, index) => {
    ctx[index === 0 ? 'moveTo' : 'lineTo'](point.x, point.y)
  })
  ctx.closePath()
  ctx.clip()

  // Draw the image within the clipping path
  ctx.drawImage(imgElement, 0, 0)

  // Update the B&W preview with the masked image
  previewBNW.value = canvas.toDataURL()
}

const mergePreviewAndBNWToPreview = async () => {
  if (!preview.value || !previewBNW.value) {
    console.error('Missing preview or processed B&W preview data')

    return
  }

  // Load the original image (preview)
  const baseImage = new Image()

  baseImage.src = preview.value
  await baseImage.decode() // Ensure the image is fully loaded

  // Load the processed B&W image (previewBNW)
  const processedImage = new Image()

  processedImage.src = previewBNW.value
  await processedImage.decode() // Ensure the image is fully loaded

  // Create a canvas to layer both images
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = baseImage.width // Assuming both images have the same dimensions
  canvas.height = baseImage.height

  // Draw the base image first
  ctx.drawImage(baseImage, 0, 0)

  // Then draw the processed B&W image on top
  ctx.drawImage(processedImage, 0, 0)

  // Update the preview with the merged image
  preview.value = canvas.toDataURL()
}

const saveMantel = async () => {
  image.value.image = preview.value

  await localForage.setItem('visualizeImage', JSON.stringify(image.value))
    .catch(error => console.error('Error saving image:', error))
}

defineExpose({ loadMantelColor, saveMantel })
</script>

<template>
  <div class="d-flex justify-center">
    <div class="image-container">
      <!-- bnw image -->
      <img
        v-if="image"
        id="baseImageBNW"
        :src="previewBNW"
        class="img-background"
        hidden
      >
      <!-- colored image -->
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
    <Loading ref="LoadingRef" />
    <!--
      <div :style="`height: 100px; width: 100px;background-color:${dominantColor}`">
      color
      </div>
    -->
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

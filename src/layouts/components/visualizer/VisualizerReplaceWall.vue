<script setup lang="ts">
import fx from '@/plugins/glfx.js'
import axios from '@axios'
import * as cv from '@techstark/opencv-js'
import localForage from 'localforage'

const props = defineProps<{
  selectedColor?: object
  rotation?: number
  translationX?: number
  translationY?: number
  tileSize?: number
  setDefaultTileSize?: Function
}>()

const router = useRouter()
const { rotation, translationX, translationY, tileSize, setDefaultTileSize } = toRefs(props)
const imageRef = ref(null)
const wallImageRef = ref(null)
const canvasContainerRef = ref(null)
const shape = ref(null)
const scaledShape = ref(null)
const positionedShape = ref(null)
const fxCanvas = ref({ canvas: null, texture: null, selectedColor: null, translationX: 0, rotation: 0, tileSize: 2 })
const canvasRefs = ref(null)
const imageSave = ref()

const getShapeSize = shape => {
  const minX = Math.min(...shape.map(p => p.x))
  const maxX = Math.max(...shape.map(p => p.x))
  const minY = Math.min(...shape.map(p => p.y))
  const maxY = Math.max(...shape.map(p => p.y))
  const width = maxX - minX
  const height = maxY - minY

  console.log(`maxY: ${maxY}`)
  console.log(`minY: ${minY}`)

  const allowanceWidth = width * 0.35
  const allowanceHeight = height * 0.35

  return { minX, minY, maxX, maxY, width, height, allowanceWidth, allowanceHeight }
}

const saveWall = async () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = imageRef.value.naturalWidth
  canvas.height = imageRef.value.naturalHeight
  ctx.drawImage(imageRef.value, 0, 0, imageRef.value.naturalWidth, imageRef.value.naturalHeight)

  const shapeSize = getShapeSize(shape.value)
  const width = shapeSize.width + (shapeSize.allowanceWidth * 2)
  const height = shapeSize.height + (shapeSize.allowanceHeight * 2)
  const targetAspectRatio = width / height
  const overlayAspectRatio = wallImageRef.value.naturalWidth / wallImageRef.value.naturalHeight
  let scale, imageWidth, imageHeight
  if (overlayAspectRatio > targetAspectRatio) {
    scale = height / wallImageRef.value.naturalHeight
    imageWidth = wallImageRef.value.naturalWidth * scale
    imageHeight = height
  }
  else {
    scale = width / wallImageRef.value.naturalWidth
    imageWidth = width
    imageHeight = wallImageRef.value.naturalHeight * scale
  }

  ctx.beginPath()
  shape.value.forEach((point, index) => {
    if (index === 0)
      ctx.moveTo(point.x, point.y)
    else
      ctx.lineTo(point.x, point.y)
  })
  ctx.closePath()
  ctx.clip()

  const x = shapeSize.minX - shapeSize.allowanceWidth
  const y = shapeSize.minY - shapeSize.allowanceHeight
  if (rotation.value) {
    ctx.translate(x + (imageWidth / 2), y + (imageHeight / 2))
    ctx.rotate(rotation.value * Math.PI / 180)
    ctx.translate(-x - (imageWidth / 2), -y - (imageHeight / 2))
    ctx.drawImage(wallImageRef.value, x, y, imageWidth, imageHeight)
    ctx.restore()
  }
  else {
    ctx.drawImage(wallImageRef.value, x, y, imageWidth, imageHeight)
  }

  imageRef.value.src = canvas.toDataURL('image/png')

  const storedImage = await localForage.getItem('visualizeImage')
  const imageData = storedImage ? JSON.parse(storedImage) : {}

  imageData.image = imageRef.value.src
  imageSave.value = imageData.image
  localForage.setItem('visualizeImage', JSON.stringify(imageData))
    .catch(error => console.error('Error saving image:', error))
}

const createTexture = async selectedColor => {
  if (fxCanvas.value.selectedColor === selectedColor && fxCanvas.value.tileSize === tileSize.value)
    return false

  const selectedColorImageElement = new Image()

  selectedColorImageElement.src = selectedColor.image
  selectedColorImageElement.crossOrigin = 'Anonymous'

  await new Promise(resolve => selectedColorImageElement.onload = resolve)

  const srcImage = cv.imread(selectedColorImageElement)
  const finalRows = srcImage.rows * tileSize.value
  const finalCols = srcImage.cols * tileSize.value
  const tiledImage = new cv.Mat.zeros(finalRows, finalCols, srcImage.type())

  // Fill the tiled image with mirrored copies
  for (let i = 0; i < Math.min(tileSize.value, 5); i++) {
    for (let j = 0; j < Math.min(tileSize.value, 5); j++) {
      const srcRegion = srcImage.clone()
      if (i % 2 === 1) { // Mirror vertically
        cv.flip(srcRegion, srcRegion, 0)
      }
      if (j % 2 === 1) { // Mirror horizontally
        cv.flip(srcRegion, srcRegion, 1)
      }

      const destRegion = tiledImage
        .rowRange(i * srcImage.rows, (i + 1) * srcImage.rows)
        .colRange(j * srcImage.cols, (j + 1) * srcImage.cols)

      srcRegion.copyTo(destRegion)
      srcRegion.delete()
    }
  }

  const canvas = document.createElement('canvas')

  cv.imshow(canvas, tiledImage)

  srcImage.delete()
  tiledImage.delete()

  const imageElement = new Image()

  imageElement.src = canvas.toDataURL()

  await new Promise(resolve => imageElement.onload = resolve)

  const shapeSize = getShapeSize(scaledShape.value)
  const width = shapeSize.width + (shapeSize.allowanceWidth * 2)
  const height = shapeSize.height + (shapeSize.allowanceHeight * 2)
  const targetAspectRatio = width / height
  const overlayAspectRatio = finalCols / finalRows
  let scale, imageWidth, imageHeight
  if (overlayAspectRatio > targetAspectRatio) {
    scale = height / finalRows
    imageWidth = finalCols * scale
    imageHeight = height
  }
  else {
    scale = width / finalCols
    imageWidth = width
    imageHeight = finalRows * scale
  }

  imageElement.width = imageWidth
  imageElement.height = imageHeight

  fxCanvas.value.texture = fxCanvas.value.canvas.texture(imageElement)
  fxCanvas.value.selectedColor = selectedColor
  fxCanvas.value.tileSize = tileSize.value

  fxCanvas.value.canvas.height = imageElement.height
  fxCanvas.value.canvas.width = imageElement.width
  fxCanvas.value.canvas.draw(fxCanvas.value.texture).update()
  wallImageRef.value.style.height = `${imageElement.height}px`
  wallImageRef.value.style.width = `${imageElement.width}px`
  wallImageRef.value.src = fxCanvas.value.canvas.toDataURL()

  return true
}

const changeWall = async selectedColor => {
  const textureCreated = await createTexture(selectedColor)

  const canvas = fxCanvas.value.canvas
  if (textureCreated || fxCanvas.value.translationX !== translationX.value || fxCanvas.value.translationY !== translationY.value) {
    const { height, width } = canvas
    const translationXValue = translationY.value ? Math.abs((translationX.value / 100) * height) : Math.abs((translationX.value / 100) * height * 4)
    const translationYValue = translationX.value ? Math.abs((translationY.value / 100) * width) : Math.abs((translationY.value / 100) * width * 4)

    if (translationXValue || translationYValue) {
      const srcPoints = [0, 0, width, 0, 0, height, width, height]

      const dstPoints = [...srcPoints]
      if (translationX.value > 0) {
        dstPoints[3] = -translationXValue
        dstPoints[7] += translationXValue
      }
      else {
        dstPoints[1] = -translationXValue
        dstPoints[5] += translationXValue
      }

      if (translationY.value > 0) {
        dstPoints[0] = -translationYValue
        dstPoints[2] += translationYValue
      }
      else {
        dstPoints[4] = -translationYValue
        dstPoints[6] += translationYValue
      }

      canvas.draw(fxCanvas.value.texture).perspective(srcPoints, dstPoints).update()
      wallImageRef.value.src = canvas.toDataURL()
    }
    else {
      canvas.draw(fxCanvas.value.texture).update()
      wallImageRef.value.src = canvas.toDataURL()
    }

    fxCanvas.value.translationX = translationX.value
    fxCanvas.value.translationY = translationY.value
  }

  if (textureCreated || fxCanvas.value.rotation !== rotation.value) {
    wallImageRef.value.style.transform = `rotate(${rotation.value}deg)`

    fxCanvas.value.rotation = rotation.value
  }

  canvasRefs.value.classList.add('d-none')
}

const drawShapeOnCanvas = () => {
  const context = canvasRefs.value.getContext('2d')

  let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity
  scaledShape.value.forEach(point => {
    minX = Math.min(minX, point.x)
    minY = Math.min(minY, point.y)
    maxX = Math.max(maxX, point.x)
    maxY = Math.max(maxY, point.y)
  })

  const width = maxX - minX
  const height = maxY - minY

  canvasRefs.value.width = width
  canvasRefs.value.height = height

  canvasRefs.value.style.left = `${minX}px`
  canvasRefs.value.style.top = `${minY}px`

  context.clearRect(0, 0, width, height)

  context.fillStyle = 'rgba(26, 78, 25, 1)'

  context.beginPath()
  scaledShape.value.forEach((point, index) => {
    const x = point.x - minX
    const y = point.y - minY
    if (index === 0)
      context.moveTo(x, y)
    else context.lineTo(x, y)
  })
  context.closePath()
  context.fill()
}

onMounted(async () => {
  try {
    const storedImage = await localForage.getItem('visualizeImage')
    if (storedImage) {
      const imageData = JSON.parse(storedImage)

      imageRef.value.src = imageData.image
    }

    const storedShape = await localForage.getItem('selectedWall')

    shape.value = storedShape ? JSON.parse(storedShape) : null
    scaledShape.value = storedShape ? JSON.parse(storedShape) : null

    if (shape.value && scaledShape.value) {
      const scaleX = imageRef.value.clientWidth / imageRef.value.naturalWidth
      const scaleY = imageRef.value.clientHeight / imageRef.value.naturalHeight

      scaledShape.value.forEach(c => c.x *= scaleX)
      scaledShape.value.forEach(c => c.y *= scaleY)
      positionedShape.value = JSON.parse(JSON.stringify(scaledShape.value))

      const shapeSize = getShapeSize(positionedShape.value)
      const top = 0 - shapeSize.minY
      const left = 0 - shapeSize.minX
      if (top !== 0)
        positionedShape.value.forEach(c => c.y += top)

      if (left !== 0)
        positionedShape.value.forEach(c => c.x += left)

      canvasContainerRef.value.style.position = 'absolute'
      canvasContainerRef.value.style.left = `${shapeSize.minX}px`
      canvasContainerRef.value.style.top = `${shapeSize.minY}px`
      wallImageRef.value.style.marginLeft = `${-shapeSize.allowanceWidth}px`
      wallImageRef.value.style.marginTop = `${-shapeSize.allowanceHeight}px`

      // setDefaultTileSize.value(Math.round(Math.min(25, (imageRef.value.naturalWidth / shapeSize.width), (imageRef.value.naturalHeight / shapeSize.height)) + 3, 0))
    }

    fxCanvas.value.canvas = fx.canvas()

    drawShapeOnCanvas()
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
})

const next = async (selectedProfile, selectedColor) => {
  try {
    await saveWall()
    if (!imageSave.value)
      throw new Error('No saved image data available.')

    const base64Content = imageSave.value.split(';base64,').pop()
    if (!base64Content)
      throw new Error('Invalid image data.')

    // Convert base64 string to a Blob.
    const blob = await (await fetch(`data:image/jpeg;base64,${base64Content}`)).blob()
    const formData = new FormData()

    formData.append('image', blob, 'image.jpg')

    // Make the API call to upload the image
    const response = await axios.post('/image-uploader/images/', formData)

    // After successful upload, store the image URL or data received from server response
    sessionStorage.setItem('processedImage', response.data.image)

    // Store additional data if necessary
    sessionStorage.setItem('processedData', JSON.stringify({
      category: sessionStorage.getItem('category'),
      stones: [
        {
          profile: selectedProfile,
          color: selectedColor,
        },
      ],
    }))

    // Navigate to the next route after successful operations
    router.push('/visualizer/compare')
  }
  catch (error) {
    console.error('Error processing the next function:', error)
  }
}

defineExpose({ changeWall, saveWall, next })
</script>

<template>
  <div class="d-flex justify-center">
    <div class="image-container">
      <img
        id="baseImage"
        ref="imageRef"
        class="img-background"
      >
      <canvas
        ref="canvasRefs"
        class="highlight"
      />
      <div
        ref="canvasContainerRef"
        style="clip-path: url('#clipPath');"
      >
        <img ref="wallImageRef">
        <svg
          v-if="positionedShape"
          height="0"
          width="0"
        >
          <defs>
            <clipPath id="clipPath">
              <polygon :points="positionedShape.map(s => `${s.x},${s.y}`).join(' ')" />
            </clipPath>
          </defs>
        </svg>
      </div>
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

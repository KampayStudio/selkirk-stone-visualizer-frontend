<script setup lang="ts">
import localForage from 'localforage'
import SnackBar from '../SnackBar.vue'

const props = defineProps({
  image: null,
  wallClicked: Function,
  enableDisableDraw: Function,
})

const route = useRoute()
const router = useRouter()

const canvasRefs = ref([])
const labelRefs = ref([])
const wallNumber = ref()

const isDraw = ref(false)

const drawingCanvas = ref(null)
const drawnPoints = ref([])

const SnackBarRef = ref(null)

const scaleShapeCoordinates = (shape, scaleX, scaleY) => {
  return shape.map(point => ({
    x: point.x * scaleX,
    y: point.y * scaleY,
  }))
}

const drawShapeOnCanvas = (canvas, shape, label) => {
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
  label.style.left = `${minX}px`
  label.style.top = `${minY}px`

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

  props.image.wall_shape.shapes.forEach((shape, index) => {
    const scaledShape = scaleShapeCoordinates(shape, scaleX, scaleY)
    if (canvasRefs.value[index])
      drawShapeOnCanvas(canvasRefs.value[index], scaledShape, labelRefs.value[index])
  })
}

const highlighted = index => {
  canvasRefs.value[index].classList.remove('notDraw')
  canvasRefs.value[index].classList.add('highlighted')
}

const removeHighlight = index => {
  canvasRefs.value[index].classList.remove('highlighted')
  canvasRefs.value[index].classList.add('notDraw')
}

onMounted(() => {
  const imgElement = document.querySelector('.image-container img')
  if (imgElement.complete) {
    drawingCanvas.value.width = imgElement.clientWidth
    drawingCanvas.value.height = imgElement.clientHeight
    drawShapes()
  }
  else {
    imgElement.addEventListener('load', () => {
      drawingCanvas.value.width = imgElement.clientWidth
      drawingCanvas.value.height = imgElement.clientHeight
      drawShapes()
    })
  }
})

const wallClicked = index => {
  console.log(index)
  wallNumber.value = index
  props.wallClicked(index)

  highlighted(index)
}

const deleteWall = () => {
  console.log(`Wall ${wallNumber.value + 1} Deleted`)

  const deletedWalls = props.image.wall_shape.shapes.splice(wallNumber.value, 1)

  removeHighlight(wallNumber.value)
  drawShapes()
  wallClicked(undefined)
}

const deleteAllWalls = () => {
  props.image.wall_shape.shapes = []
}

const apply = () => {
  localForage.setItem('visualizeImage', JSON.stringify(props.image))
  router.replace(route.query.to ? String(route.query.to) : '/visualizer')
}

const drawLines = () => {
  const ctx = drawingCanvas.value.getContext('2d')

  ctx.lineWidth = 3
  ctx.beginPath()
  drawnPoints.value.forEach((point, index) => {
    if (index === 0)
      ctx.moveTo(point.x, point.y)
    else
      ctx.lineTo(point.x, point.y)
  })
  ctx.strokeStyle = '#38A736' // Line color
  ctx.stroke()
}

const addPoint = event => {
  const { offsetX, offsetY } = event

  drawnPoints.value.push({ x: offsetX, y: offsetY })

  // Optionally, mark the point with a small dot
  const ctx = drawingCanvas.value.getContext('2d')

  ctx.fillStyle = '#38A736' // Dot color
  ctx.beginPath()
  ctx.arc(offsetX, offsetY, 5, 0, Math.PI * 2) // Small dot
  ctx.fill()
  drawLines()
  console.log(drawnPoints.value)
}

const addPathToMainPathList = () => {
  const imgElement = document.querySelector('.image-container img')
  if (!imgElement)
    return

  // Original dimensions
  const originalWidth = imgElement.naturalWidth
  const originalHeight = imgElement.naturalHeight

  // Displayed dimensions
  const displayedWidth = imgElement.clientWidth
  const displayedHeight = imgElement.clientHeight

  // Calculate reverse scaling factors
  const reverseScaleX = originalWidth / displayedWidth
  const reverseScaleY = originalHeight / displayedHeight

  // Apply reverse scaling to drawnPoints
  const scaledPoints = drawnPoints.value.map(point => ({
    x: point.x * reverseScaleX,
    y: point.y * reverseScaleY,
  }))

  // Push scaled points to shapes
  props.image.wall_shape.shapes.push(scaledPoints)
  console.log('Scaled points added to shapes:', scaledPoints)

  // Optionally, reset drawnPoints or handle it as needed
  drawnPoints.value = []

  if (drawingCanvas.value) {
    const ctx = drawingCanvas.value.getContext('2d')

    ctx.clearRect(0, 0, drawingCanvas.value.width, drawingCanvas.value.height)
  }

  SnackBarRef.value.show('success', 'Custom wall successfuly added')
}

const enableDisableDraw = () => {
  isDraw.value = !isDraw.value

  // addPathToMainPathList()
  drawShapes()

  console.log('Canvas Cleared')
}

const undo = () => {
  drawnPoints.value.pop()

  if (drawingCanvas.value) {
    const ctx = drawingCanvas.value.getContext('2d')

    ctx.clearRect(0, 0, drawingCanvas.value.width, drawingCanvas.value.height)
  }
  drawLines()
}

defineExpose({ deleteWall, apply, enableDisableDraw, addPathToMainPathList, undo, deleteAllWalls })
</script>

<template>
  <div class="d-flex justify-center">
    <div class="image-container">
      <img
        :src="image.image"
        class="img-background"
      >
      <canvas
        v-for="(shape, index) in image.wall_shape.shapes"
        v-show="!isDraw"
        :key="index"
        ref="canvasRefs"
        class="shape-canvas notDraw"
        @click="wallClicked(index)"
      />
      <div
        v-for="(shape, index) in image.wall_shape.shapes"
        v-show="!isDraw"
        :key="index"
        ref="labelRefs"
        class="box-index"
      >
        {{ index + 1 }}
      </div>
      <canvas
        v-show="isDraw"
        ref="drawingCanvas"
        class="drawing-canvas"
        @click="addPoint"
      />
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
    max-block-size: 80vh;
  }
}

.notDraw {
  position: absolute;
  z-index: 1;
  inset-block-start: 0;
  inset-inline-start: 0;
  opacity: 0.1;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;

  }
}

.highlighted{
  position: absolute;
  z-index: 1;
  inset-block-start: 0;
  inset-inline-start: 0;
  opacity: 0.7;
}

.box-index{
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #38A736;
  block-size: 2rem;
  color: white;
  inline-size: 2rem;
}

.drawing-canvas {
  position: absolute;
  z-index: 2;
  inset-block-start: 0;
  inset-inline-start: 0;
}
</style>

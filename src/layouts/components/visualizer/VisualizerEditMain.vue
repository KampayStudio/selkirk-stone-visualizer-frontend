<script setup lang="ts">
import localForage from 'localforage'

const props = defineProps({
  image: null,
  wallClicked: Function,
})

const route = useRoute()
const router = useRouter()

const canvasRefs = ref([])
const labelRefs = ref([])
const wallNumber = ref()

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

onMounted(() => {
  const imgElement = document.querySelector('.image-container img')
  if (imgElement.complete) {
    // If image is already loaded
    drawShapes()
  }
  else {
    // Add event listener if the image is not loaded yet
    imgElement.addEventListener('load', drawShapes)
  }
})

const wallClicked = index => {
  console.log(index)
  wallNumber.value = index
  props.wallClicked(index)
  drawShapes()
}

const deleteWall = () => {
  console.log(`Wall ${wallNumber.value + 1} Deleted`)

  const deletedWalls = props.image.wall_shape.shapes.splice(wallNumber.value, 1)

  console.log(deletedWalls)

  wallClicked(undefined)
}

const apply = () => {
  localForage.setItem('visualizeImage', JSON.stringify(props.image))
  router.replace(route.query.to ? String(route.query.to) : '/visualizer')
}

defineExpose({ deleteWall, apply })
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
        :key="index"
        ref="canvasRefs"
        class="shape-canvas"
        @click="wallClicked(index)"
      />
      <div
        v-for="(shape, index) in image.wall_shape.shapes"
        :key="index"
        ref="labelRefs"
        class="box-index"
      >
        {{ index + 1 }}
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
    max-block-size: 80vh;
  }
}

canvas {
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
</style>

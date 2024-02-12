<script setup lang="ts">
const image = ref({
  image: '/temp/sample1.jpeg',
  wall_shape: {
    shapes: [
      [
        { x: 0, y: 70 },
        { x: 420, y: 75 },
        { x: 422, y: 910 },
        { x: 445, y: 911 },
        { x: 444, y: 1008 },
        { x: 424, y: 1018 },
        { x: 424, y: 1064 },
        { x: 364, y: 1064 },
        { x: 354, y: 1034 },
        { x: 354, y: 1034 },
        { x: 318, y: 1069 },
        { x: 318, y: 1069 },
        { x: 285, y: 1058 },
        { x: 285, y: 1058 },
        { x: 160, y: 1038 },
        { x: 0, y: 1088 },
        { x: 0, y: 730 },
        { x: 48, y: 738 },
        { x: 265, y: 738 },
        { x: 265, y: 635 },
        { x: 255, y: 630 },
        { x: 255, y: 460 },
        { x: 243, y: 455 },
        { x: 243, y: 215 },
        { x: 70, y: 215 },
        { x: 70, y: 525 },
        { x: 70, y: 525 },
        { x: 0, y: 485 },
      ],
      [
        { x: 420, y: 10 },
        { x: 860, y: 12 },
        { x: 860, y: 608 },
        { x: 690, y: 608 },
        { x: 690, y: 848 },
        { x: 862, y: 848 },
        { x: 862, y: 915 },
        { x: 420, y: 915 },
      ],
      [
        { x: 420, y: 1020 },
        { x: 860, y: 1020 },
        { x: 860, y: 1065 },
        { x: 420, y: 1065 },
      ],
      [
        { x: 860, y: 75 },
        { x: 1280, y: 75 },
        { x: 1280, y: 522 },
        { x: 860, y: 522 },
      ],
      [
        { x: 860, y: 75 },
        { x: 1280, y: 75 },
        { x: 1280, y: 522 },
        { x: 860, y: 522 },
      ],
      [
        { x: 860, y: 522 },
        { x: 1280, y: 522 },
        { x: 1280, y: 652 },
        { x: 1268, y: 656 },
        { x: 1268, y: 1032 },
        { x: 1225, y: 1032 },
        { x: 1215, y: 1100 },
        { x: 1138, y: 1100 },
        { x: 1138, y: 1073 },
        { x: 1092, y: 1052 },
        { x: 1092, y: 1052 },
        { x: 860, y: 1052 },
        { x: 862, y: 848 },
        { x: 692, y: 848 },
        { x: 692, y: 606 },
        { x: 860, y: 606 },
      ],
    ],
  },
})

const canvasRefs = ref([])
const labelRefs = ref([])

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

  image.value.wall_shape.shapes.forEach((shape, index) => {
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
</script>

<template>
  <section class="">
    <VCard>
      <VCardText>
        <VRow>
          <VCol class="d-flex gap-x-2">
            <VBtn>
              Draw
            </VBtn>
            <VBtn>
              Delete
            </VBtn>
          </VCol>
        </VRow>

        <VRow class=" d-flex justify-center">
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
            />
            <div
              v-for="(shape, index) in image.wall_shape.shapes"
              :key="index"
              ref="labelRefs"
              class="box-index"
            >
              {{ index }}
            </div>
          </div>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            class="d-flex flex-row align-center justify-space-between"
          >
            <h3>Walls Detected: {{ image.wall_shape.shapes.length }}</h3>
            <VBtn :to="{ name: 'visualizer' }">
              Apply Changes
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </section>
</template>

<style lang="scss">
section{
  padding: 2rem;
  margin-inline: auto;
  max-inline-size: 1440px;
}

.image-container {
  position: relative;

  img{
    max-block-size: 60vh;

  }
}

canvas {
  position: absolute;
  z-index: 1;
  inset-block-start: 0;
  inset-inline-start: 0;
  opacity: 0.1; // Base opacity
  transition: opacity 0.3s ease; // Smooth transition for opacity change

  &:hover {
    opacity: 0.7; // Opacity on hover
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

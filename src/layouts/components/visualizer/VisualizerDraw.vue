<script setup lang="ts">
import { onMounted, ref } from 'vue'

const drawingCanvas = ref(null)
const drawnPoints = ref([])

const addPoint = event => {
  const { offsetX, offsetY } = event

  drawnPoints.value.push({ x: offsetX, y: offsetY })

  // Optionally, mark the point with a small dot
  const ctx = drawingCanvas.value.getContext('2d')

  ctx.fillStyle = '#000' // Dot color
  ctx.beginPath()
  ctx.arc(offsetX, offsetY, 3, 0, Math.PI * 2) // Small dot
  ctx.fill()
  drawLines()
  console.log(drawnPoints.value)
}

const drawLines = () => {
  const ctx = drawingCanvas.value.getContext('2d')

  ctx.beginPath()
  drawnPoints.value.forEach((point, index) => {
    if (index === 0)
      ctx.moveTo(point.x, point.y)
    else
      ctx.lineTo(point.x, point.y)
  })
  ctx.strokeStyle = '#000' // Line color
  ctx.stroke()
}

onMounted(() => {
  // Adjust these values as per your requirements
  drawingCanvas.value.width = 800
  drawingCanvas.value.height = 600
})
</script>

<template>
  <div class="image-container">
    <canvas
      ref="drawingCanvas"
      class="drawing-canvas"
      @click="addPoint"
    />
  </div>
</template>

<style>
/* Your existing styles */
.image-container {
  position: relative;
  block-size:600px;
}

.drawing-canvas {
  position: absolute;
  z-index: 2;
  inset-block-start: 0;
  inset-inline-start: 0;
}
</style>

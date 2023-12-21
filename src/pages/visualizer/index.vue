<script setup lang="ts">
import Main from './sections/main.vue'

import Visualize from './sections/visualize.vue'
import WallSelection from './sections/wall-selection.vue'

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

const selectedWall = ref()
const currentWindow = ref('selectWall')

const changeSection = (section: string) => {
  currentWindow.value = section
}

const changeWall = wall => {
  selectedWall.value = wall
}
</script>

<template>
  <section>
    <VCard>
      <VWindow
        v-model="currentWindow"
        :touch="false"
      >
        <VWindowItem
          key="main"
          value="main"
        >
          <Main
            :image="image"
            @proceed="changeSection"
          />
        </VWindowItem>

        <VWindowItem
          key="selectWall"
          value="selectWall"
        >
          <WallSelection
            :image="image"
            :selected-wall="selectedWall"
            @proceed="changeSection"
            @wall-select="changeWall"
          />
        </VWindowItem>
        <VWindowItem value="visualize">
          <Visualize
            :image="image"
            :selected-wall="selectedWall"
            @proceed="changeSection"
          />
        </VWindowItem>
      </VWindow>
    </VCard>
  </section>
</template>

<style lang="scss">
section{
  padding: 2rem;
  margin-inline: auto;
  max-inline-size: 1440px;
}
</style>

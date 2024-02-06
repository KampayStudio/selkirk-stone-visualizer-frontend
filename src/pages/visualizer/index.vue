<script setup lang="ts">
import Main from './sections/main.vue'

import Visualize from './sections/visualize.vue'
import WallSelection from './sections/wall-selection.vue'

// import wallImage from '@images/1692044741530.jpeg'

const image = ref(JSON.parse(localStorage.getItem('visualizeImage')))

// const image = ref(wallImage)
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

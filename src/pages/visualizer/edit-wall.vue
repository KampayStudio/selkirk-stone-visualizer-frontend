<script setup lang="ts">
import localForage from 'localforage'
import VisualizerEditMain from '@/layouts/components/visualizer/VisualizerEditMain.vue'

const image = ref()
const VisualizerEditMainRef = ref(undefined)
const wallNumber = ref(undefined)

const assignWall = index => {
  wallNumber.value = index
}

onMounted(async () => {
  try {
    const storedImage = await localForage.getItem('visualizeImage')

    if (storedImage) {
      try {
        image.value = JSON.parse(storedImage)
      }
      catch (e) {
        console.error('Error parsing image data:', e)
      }
    }
  }
  catch (e) {
    console.error('Error fetching image from localForage:', e)
  }
})
</script>

<template>
  <div class="max-section-width mt-5">
    <VCard>
      <VCardText>
        <!-- Top Buttons -->
        <div class="d-flex gap-x-3">
          <VBtn variant="outlined">
            Draw
          </VBtn>
          <VBtn
            v-if="VisualizerEditMainRef"
            variant="outlined"
            :disabled="wallNumber === undefined"
            @click="VisualizerEditMainRef.deleteWall"
          >
            Delete
          </VBtn>
        </div>

        <!-- Image display -->
        <div
          v-if="image"
          class="my-5"
        >
          <VisualizerEditMain
            ref="VisualizerEditMainRef"
            :image="image"
            :wall-clicked="assignWall"
          />
        </div>

        <div
          v-if="image"
          class="d-flex justify-space-between"
        >
          <div class="d-flex gap-x-3">
            <h6 class="text-h6">
              Walls Detected: {{ image.wall_shape.shapes.length }}
            </h6>
            <VDivider
              v-if="wallNumber !== undefined"
              vertical
            />
            <h6
              v-if="wallNumber !== undefined"
              class="text-h6"
            >
              Selected Wall: {{ wallNumber + 1 }}
            </h6>
          </div>

          <div>
            <VBtn
              v-if="VisualizerEditMainRef"
              @click="VisualizerEditMainRef.apply"
            >
              Done
            </VBtn>
          </div>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
.max-section-width {
  margin-inline: auto;
  max-inline-size: 1440px;
}
</style>

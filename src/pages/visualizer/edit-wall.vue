<script setup lang="ts">
import localForage from 'localforage'
import VisualizerEditMain from '@/layouts/components/visualizer/VisualizerEditMain.vue'

const image = ref()
const VisualizerEditMainRef = ref(undefined)
const wallNumber = ref(undefined)
const isDraw = ref(false)

const assignWall = index => {
  wallNumber.value = index
}

const showHideDraw = () => {
  isDraw.value = !isDraw.value
  VisualizerEditMainRef.value.enableDisableDraw()
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
        <div>
          <div
            v-if="image"
            class="d-flex justify-space-between mb-2"
          >
            <div class="d-flex gap-x-3 align-center">
              <div v-if="!isDraw">
                <h6 class="text-h6 ">
                  Walls Detected: {{ image.wall_shape.shapes.length }}
                </h6>
                <div>
                  If you're not satisfied with the detected walls, you can easily edit them. Simply select a wall to delete it or draw your custom wall instead.
                </div>
              </div>

              <VDivider
                v-if="wallNumber !== undefined"
                vertical
              />
              <h6
                v-if="wallNumber !== undefined && !isDraw"
                class="text-h6"
              >
                Selected Wall: {{ wallNumber + 1 }}
              </h6>
              <h6
                v-if="isDraw"
                class="text-h6"
              >
                Create your custom wall by simply clicking on the points that mark the corners of your walls.
              </h6>
            </div>
          </div>
          <!-- Top Buttons -->
          <div class="d-flex gap-x-3">
            <VBtn
              v-if="VisualizerEditMainRef"
              variant="outlined"
              @click="showHideDraw"
            >
              {{ isDraw ? "Back to Edit" : "Draw Custom Wall" }}
            </VBtn>
            <VBtn
              v-if="VisualizerEditMainRef && !isDraw"
              variant="outlined"
              :disabled="wallNumber === undefined"
              @click="VisualizerEditMainRef.deleteWall"
            >
              Delete
            </VBtn>
            <VBtn
              v-if="isDraw"
              variant="outlined"
              @click="VisualizerEditMainRef.undo"
            >
              Undo Recent Line
            </VBtn>

            <VBtn
              v-if="VisualizerEditMainRef && !isDraw"
              @click="VisualizerEditMainRef.apply"
            >
              Save Changes
            </VBtn>
            <VBtn
              v-if="isDraw"
              @click="VisualizerEditMainRef.addPathToMainPathList"
            >
              Add as wall
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

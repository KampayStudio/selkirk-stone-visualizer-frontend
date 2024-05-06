<script setup lang="ts">
import localForage from 'localforage'
import VisualizerEditMain from '@/layouts/components/visualizer/mantel/VisualizerEditMain.vue'

const image = ref()
const mantels = ref()
const VisualizerEditMainRef = ref(undefined)
const wallNumber = ref(undefined)
const isDraw = ref(false)

const isDeleteAllDialogShow = ref(false)

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
    const mantelsAnnot = await localForage.getItem('visualizedMantels')
    if (storedImage) {
      try {
        image.value = JSON.parse(storedImage)
        mantels.value = JSON.parse(mantelsAnnot)
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
                <div class="d-flex mb-2">
                  <h6 class="text-h6 ">
                    Mantel Count: {{ mantels.wall_shape.shapes.length }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <!-- Top Buttons -->
          <div class="d-block gap-x-3 d-md-flex">
            <VBtn
              v-if="VisualizerEditMainRef"
              variant="outlined"
              class="mt-2 mx-1"
              @click="showHideDraw"
            >
              {{ isDraw ? "Back to Edit Mantel" : "Draw Mantel" }}
            </VBtn>
            <VBtn
              v-if="VisualizerEditMainRef && !isDraw"
              variant="outlined"
              :disabled="wallNumber === undefined"
              class="mt-2 mx-1"
              @click="VisualizerEditMainRef.deleteWall"
            >
              Delete
            </VBtn>
            <VBtn
              v-if="VisualizerEditMainRef && !isDraw"
              variant="outlined"
              class="mt-2 mx-1"
              @click="isDeleteAllDialogShow = !isDeleteAllDialogShow"
            >
              Delete All
            </VBtn>
            <VBtn
              v-if="isDraw"
              variant="outlined"
              class="mt-2 mx-1"
              @click="VisualizerEditMainRef.undo"
            >
              Undo Recent Line
            </VBtn>

            <VBtn
              v-if="VisualizerEditMainRef && !isDraw"
              class="mt-2 mx-1"
              @click="VisualizerEditMainRef.apply"
            >
              Save Changes
            </VBtn>
            <VBtn
              v-if="isDraw"
              class="mt-2 mx-1"
              @click="VisualizerEditMainRef.addPathToMainPathList"
            >
              Make Mantel
            </VBtn>
          </div>

          <!-- Image display -->

          <div
            v-if="image"
            class="my-5"
          >
            <VisualizerEditMain
              ref="VisualizerEditMainRef"
              :image="mantels"
              :wall-clicked="assignWall"
            />
          </div>
        </div>
      </VCardText>
    </VCard>

    <VDialog
      v-model="isDeleteAllDialogShow"
      max-width="500"
    >
      <VCard class="text-center px-10 py-6">
        <VCardText>
          <VBtn
            icon
            variant="outlined"
            color="warning"
            class="my-4"
            style=" block-size: 88px;inline-size: 88px; pointer-events: none;"
          >
            <span class="text-5xl">!</span>
          </VBtn>

          <h6 class="text-lg font-weight-medium">
            Are you sure you want to continue?
          </h6>

          <p class="text-body-2">
            This action will delete all detected walls.
          </p>
        </VCardText>

        <VCardActions class="align-center justify-center gap-2">
          <VBtn
            v-if="VisualizerEditMainRef"
            variant="elevated"
            @click="() => {
              VisualizerEditMainRef.deleteAllWalls()
              isDeleteAllDialogShow = false
            }"
          >
            Delete all
          </VBtn>

          <VBtn
            color="secondary"
            variant="outlined"
            @click="isDeleteAllDialogShow = !isDeleteAllDialogShow"
          >
            Cancel
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style lang="scss">
.max-section-width {
  margin-inline: auto;
  max-inline-size: 1440px;
}
</style>

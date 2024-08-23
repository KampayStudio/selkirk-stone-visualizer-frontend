<script setup lang="ts">
import VisualizerEditMain from '@/layouts/components/visualizer/VisualizerEditMain.vue'
import localForage from 'localforage'

const image = ref()
const VisualizerEditMainRef = ref(undefined)
const wallNumber = ref(undefined)
const isDraw = ref(false)

const isDeleteAllDialogShow = ref(false)
const isDialogOpen = ref(false)

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

const toggleDialog = () => {
  isDialogOpen.value = !isDialogOpen.value
}
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
                    Walls Detected: {{ image.wall_shape.shapes.length }}
                  </h6>
                  <VDivider
                    v-if="wallNumber !== undefined"
                    class="mx-3"
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

                <div>
                  If you're not satisfied with the detected walls, you can easily edit them. Simply select a wall to delete it or draw your custom wall instead.
                </div>
              </div>
            </div>
            <VBtn
              variant="outlined"
              @click="toggleDialog"
            >
              Get Help
            </VBtn>
          </div>
          <!-- Top Buttons -->
          <div class="d-block gap-x-3 d-lg-flex">
            <VBtn
              v-if="VisualizerEditMainRef"
              variant="outlined"
              class="mt-2 mx-1"
              @click="showHideDraw"
            >
              {{ isDraw ? "Back to Edit Wall" : "Draw Custom Wall" }}
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
              Make Custom Wall
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

    <VDialog v-model="isDialogOpen">
      <VCard
        max-width="1280"
        min-width="300"
        class="mx-auto w-100"
      >
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">
            Get Help
          </div>

          <VBtn
            icon="mdi-close"
            variant="text"
            @click="toggleDialog"
          />
        </VCardTitle>
        <iframe
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/E8_EDOrIJcM"
          title="Selkirk Stone App Custom Wall Tutorial"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
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

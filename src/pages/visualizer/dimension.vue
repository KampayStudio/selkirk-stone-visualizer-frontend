<script setup lang="ts">
import localForage from 'localforage'
import VisualizerPreview from '@/layouts/components/visualizer/VisualizerPreview.vue'

const route = useRoute()
const router = useRouter()
const image = ref()
const visualizerData = ref()

onMounted(async () => {
  try {
    const storedImage = await localForage.getItem('visualizeImage')

    visualizerData.value = JSON.parse(await localForage.getItem('visualizerData'))
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
    console.log(e)
  }
})

const submit = async () => {
  await localForage.setItem('visualizerData', JSON.stringify(visualizerData.value))
}

const selectAnotherWall = () => {
  submit()
  router.replace(route.query.to ? String(route.query.to) : '/visualizer/wall-selection')
}

const finish = () => {
  submit()
  router.replace(route.query.to ? String(route.query.to) : '/visualizer/compare')
}
</script>

<template>
  <section v-if="image && visualizerData">
    <VCard>
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="8"
          >
            <VisualizerPreview :image="image" />
          </VCol>
          <VCol
            cols="12"
            md="4"
            class="d-flex flex-column justify-center gap-y-3"
          >
            <div class="mt-auto">
              <h6
                class="text-h6"
                style="color: #5F2726;"
              >
                Wall {{ visualizerData.current_wall_number }} selected
              </h6>
              <h5
                class="text-h5"
                style="color: #1A4E19;"
              >
                Input Dimension
              </h5>
              <p class="text-body-2">
                Input the wall dimensions for an estimated stone usage calculation.
              </p>

              <VDivider />
              <VForm class="mt-3">
                <VRow>
                  <VCol

                    cols="2"
                    class="d-flex align-center"
                  >
                    Area
                  </VCol>
                  <VCol>
                    <VTextField
                      v-model="visualizerData.dimensions[visualizerData.current_wall_number].area"
                      label="Value"
                    />
                  </VCol>
                  <VCol
                    cols="2"
                    class="d-flex align-center"
                  >
                    ft²
                  </VCol>
                </VRow>
                <VRow>
                  <VCol>
                    <div class="d-flex align-center gap-x-3">
                      <div class="text-body-2">
                        or
                      </div>

                      <VDivider />
                    </div>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol
                    cols="2"
                    class="d-flex align-center"
                  >
                    Height
                  </VCol>
                  <VCol>
                    <VTextField
                      v-model="visualizerData.dimensions[visualizerData.current_wall_number].height"
                      label="Value"
                    />
                  </VCol>
                  <VCol
                    cols="2"
                    class="d-flex align-center"
                  >
                    ft²
                  </VCol>
                </VRow>
                <VRow>
                  <VCol
                    cols="2"
                    class="d-flex align-center"
                  >
                    Width
                  </VCol>
                  <VCol>
                    <VTextField
                      v-model="visualizerData.dimensions[visualizerData.current_wall_number].width"
                      label="Value"
                    />
                  </VCol>
                  <VCol
                    cols="2"
                    class="d-flex align-center"
                  >
                    ft²
                  </VCol>
                </VRow>
              </VForm>
            </div>

            <div class="d-block mt-auto ms-auto gap-x-3 d-lg-flex">
              <RouterLink to="/visualizer/visualize-wall">
                <VBtn
                  variant="outlined"
                  class="mt-2 me-1"
                >
                  Back
                </VBtn>
              </RouterLink>
              <VBtn
                variant="outlined"
                class="mt-2"
                @click="selectAnotherWall"
              >
                Select Another Wall
              </VBtn>

              <div class="d-flex flex-column gap-y-1 justify-end mt-2">
                <VBtn @click="finish">
                  Finish
                </VBtn>
                <div
                  class="text-body-2 text-decoration-underline text-end"
                  style="cursor: pointer"
                  @click="finish"
                >
                  Skip this part
                </div>
              </div>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </section>
</template>

<style lang="scss" scoped>
section{
  margin: 3rem;

  @media (max-width: 60rem) {
    margin-inline: 1rem;
  }
}
</style>

<script setup lang="ts">
import localForage from 'localforage'
import Loading from '@/layouts/components/Loading.vue'
import axiosIns from '@/plugins/axios'

const selectedSection = ref('exterior')
const route = useRoute()
const router = useRouter()
const LoadingRef = ref()

const interior = ref([])

const exterior = ref([])

const mantle = ref([])

const fetchExterior = async () => {
  try {
    const response = await axiosIns.get('/sample_scenes/sample-exterior/')

    exterior.value = response.data
  }
  catch (e) {
    console.log(e)
  }
}

const fetchInterior = async () => {
  try {
    const response = await axiosIns.get('/sample_scenes/sample-interior/')

    interior.value = response.data
  }
  catch (e) {
    console.log(e)
  }
}

const fetchMantle = async () => {
  try {
    const response = await axiosIns.get('/sample_scenes/sample-mantle/')

    mantle.value = response.data
  }
  catch (e) {
    console.log(e)
  }
}

const fetch = async () => {
  // exterior
  fetchExterior()

  // interior
  fetchInterior()

  // mantle
  fetchMantle()
}

const convertImageToBase64 = imageUrl => {
  return new Promise((resolve, reject) => {
    try {
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader()

          reader.onloadend = () => {
            resolve(reader.result)
          }
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
        .catch(reject)
    }
    catch (error) {
      console.error('Error converting image:', error)
      reject(error)
    }
  })
}

const goToVisualizer = async sampleImage => {
  LoadingRef.value.triggerDialog(true)
  try {
    const toVisualize = { ...sampleImage }

    sessionStorage.setItem('visualizeImage', JSON.stringify(toVisualize))

    router.replace(route.query.to ? String(route.query.to) : '/visualizer')
  }
  catch (error) {
    console.error('Error in goToVisualizer:', error)
  }
  finally {
    LoadingRef.value.triggerDialog(false)
  }
}

const goToMantleVisualizer = async sampleImage => {
  try {
    const toVisualize = ref({ ...sampleImage })

    toVisualize.value.image = await convertImageToBase64(sampleImage.image)

    // toVisualize.value.wall_shape.shapes = []
    localForage.setItem('visualizeImage', JSON.stringify(toVisualize.value))
    localForage.setItem('visualizedMantels', JSON.stringify(toVisualize.value))
    console.log(toVisualize.value)

    const visualizerData = ref({
      dimensions: [],
      raw_image: undefined,
      current_wall_number: 0,
    })

    for (let i = 0; i < toVisualize.value.wall_shape.shapes.length; i++) {
      visualizerData.value.dimensions.push({
        area: 0,
        height: 0,
        width: 0,
        stone_type: '',
        stone_color: '',
      })
    }
    visualizerData.value.raw_image = toVisualize.value.image
    visualizerData.value.current_wall_number = 0
    localForage.setItem('visualizerData', JSON.stringify(visualizerData.value))

    router.replace(route.query.to ? String(route.query.to) : '/visualizer/mantel')
  }
  catch (error) {
    console.error('Visualizer:', error)
  }
}

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)

  if (urlParams.has('section'))
    selectedSection.value = urlParams.get('section')

  await fetch()
})
</script>

<template>
  <section class="max-section-width">
    <VRow>
      <VCol
        cols="12"
        md="6"
        class="d-flex flex-column gap-y-2"
      >
        <h3 class="text-h3 text-primary">
          Try Sample Scenes
        </h3>
        <p class="text-body-2">
          Selecting from our sample scenes below to start visualize our range of high-quality manufactured stone and brick veneers.
        </p>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VBtn
          variant="outlined"
          :to="{ name: 'visualizer-upload' }"
        >
          Upload Photo
        </VBtn>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VCard>
          <VCardText>
            <VTabs v-model="selectedSection">
              <VTab value="exterior">
                Exterior
              </VTab>
              <VTab value="interior">
                Interior
              </VTab>
              <VTab value="mantle">
                Non-Combustible Mantel
              </VTab>
            </VTabs>
            <VWindow v-model="selectedSection">
              <!-- Interior -->
              <VWindowItem
                value="interior"
                style="padding: 1rem;"
              >
                <!-- Skeleton Loading -->
                <VRow
                  v-if="interior.length === 0"
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in 12"
                    :key="i"
                    class="text-center d-flex justify-center flex-column"
                    cols="12"
                    md="3"
                    style="align-items: center; cursor: pointer"
                  >
                    <div class="image-mask image-container">
                      <PuSkeleton
                        width="400px"
                        height="400px"
                      />
                    </div>
                  </VCol>
                </VRow>
                <VRow
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in interior"
                    :key="i.image"
                    class="text-center d-flex justify-center flex-column"
                    cols="12"

                    md="3"

                    style="align-items: center; cursor: pointer"
                  >
                    <div
                      class="image-mask image-container mx-auto"
                      @click="goToVisualizer(i)"
                    >
                      <img :src="i.thumbnail">
                      <!-- <VCheckbox class="checkbox" /> -->
                    </div>
                  </VCol>
                </VRow>
              </VWindowItem>
              <!-- Exterior -->
              <VWindowItem
                value="exterior"
                style="padding: 1rem;"
              >
                <!-- Skeleton Loading -->
                <VRow
                  v-if="exterior.length === 0"
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in 12"
                    :key="i"
                    class="text-center d-flex justify-center flex-column"
                    cols="12"

                    md="3"

                    style="align-items: center; cursor: pointer"
                  >
                    <div class="image-mask image-container">
                      <PuSkeleton
                        width="400px"
                        height="400px"
                      />
                    </div>
                  </VCol>
                </VRow>
                <VRow
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in exterior"
                    :key="i.image"
                    class="text-center"
                    cols="12"

                    md="3"

                    style="cursor: pointer"
                  >
                    <div
                      class="image-mask image-container mx-auto"
                      @click="goToVisualizer(i)"
                    >
                      <img :src="i.thumbnail">
                      <!-- <VCheckbox class="checkbox" /> -->
                    </div>
                  </VCol>
                </VRow>
              </VWindowItem>
              <!-- Mantle -->
              <VWindowItem
                value="mantle"
                style="padding: 1rem;"
              >
                <!-- Skeleton Loading -->
                <VRow
                  v-if="mantle.length === 0"
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in 12"
                    :key="i"
                    class="text-center d-flex justify-center flex-column"
                    cols="12"

                    md="3"

                    style="align-items: center;"
                  >
                    <div class="image-mask image-container">
                      <PuSkeleton
                        width="400px"
                        height="400px"
                      />
                    </div>
                  </VCol>
                </VRow>
                <VRow
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in mantle"
                    :key="i.image"
                    class="text-center"
                    cols="12"
                    md="3"
                    style="cursor: pointer"
                  >
                    <div
                      class="image-mask image-container mx-auto"
                      @click="goToMantleVisualizer(i)"
                    >
                      <img :src="i.thumbnail">
                      <!-- <VCheckbox class="checkbox" /> -->
                    </div>
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <Loading ref="LoadingRef" />
  </section>
</template>

<style lang="scss">
.max-section-width {
  margin-inline: auto;
  max-inline-size: 1440px;
}

section{
  padding: 2rem;
}

.image-mask {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  block-size: 15rem;
  inline-size: 15rem;

  img {
    block-size: auto;
    inline-size: 100%;
  }
}
</style>

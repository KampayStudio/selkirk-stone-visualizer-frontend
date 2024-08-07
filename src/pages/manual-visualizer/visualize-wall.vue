<script setup lang="ts">
import VisualizerReplaceWall from '@/layouts/components/visualizer/VisualizerReplaceWall.vue'
import axiosIns from '@/plugins/axios'

const router = useRouter()
const loading = ref(false)
const VisualizerReplaceWallRef = ref(null)

const stones = ref([])

const fetchStones = async () => {
  loading.value = true
  try {
    const response = await axiosIns.get('/products/products/')

    stones.value = response.data
  }
  catch (e) {
    console.log(e)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStones()
})

const currentStone = ref()
const currentSection = ref('categories')
const selectedColor = ref(null)
const selectedCategory = ref()
const rotation = ref(0)
const translationX = ref(0)
const translationY = ref(0)
const tileSize = ref(1)
const isLoadingOpen = ref(false)

const changeWall = () => {
  if (!selectedColor.value || !VisualizerReplaceWallRef.value)
    return

  VisualizerReplaceWallRef.value.changeWall()
}

watch(rotation, () => changeWall())
watchDebounced(translationX, () => changeWall(), { debounce: 100, maxWait: 200 })
watchDebounced(translationY, () => changeWall(), { debounce: 100, maxWait: 200 })
watchDebounced(tileSize, () => changeWall(), { debounce: 500, maxWait: 1000 })

const insightTrackEvent = (category, color, id) => {
  const event = {
    name: 'SelectedStone',
    properties: {
      stone_category: category,
      stone_color: color,
      stone_id: id,
    },
  }

  console.log('sent')
  app_insights.trackEvent(event)
}

async function convertImageToBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok)
      throw new Error(`HTTP error! status: ${response.status}`)

    const blob = await response.blob()

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
  catch (error) {
    console.error('Error converting image to base64:', error)
    throw error
  }
}

const selectStone = async (stone: any) => {
  currentStone.value = stone
  currentSection.value = 'colors'
  selectedCategory.value = stone.name
}

const selectColor = async (stone: any) => {
  insightTrackEvent(selectedCategory.value, stone.name, stone.id)
  isLoadingOpen.value = true
  currentSection.value = 'configuration'

  selectedColor.value = { ...stone }
  selectedColor.value.image = await convertImageToBase64(selectedColor.value.image)

  changeWall()

  isLoadingOpen.value = false

  const response = await axiosIns.post('https://api.selkirkstone.app/api/analytics/product_analytics/', {
    stone_id: 0,
    stone_category: selectedCategory.value,
    stone_color: selectedColor.value.name,
  })

  console.log(response)
}

const saveWall = async routeTo => {
  currentSection.value = 'configuration'
  isLoadingOpen.value = true

  if (VisualizerReplaceWallRef.value)
    await VisualizerReplaceWallRef.value.saveWall()

  isLoadingOpen.value = false

  router.replace(routeTo)
}

let defaultTileSize = 1

const setDefaultTileSize = value => {
  defaultTileSize = value

  tileSize.value = defaultTileSize
}

const reset = () => {
  rotation.value = 0
  translationX.value = 0
  translationY.value = 0
  tileSize.value = defaultTileSize
}
</script>

<template>
  <section>
    <VCard :loading="loading">
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="8"
            class="d-flex align-center justify-center"
          >
            <VisualizerReplaceWall
              ref="VisualizerReplaceWallRef"
              :selected-color="selectedColor"
              :rotation="rotation"
              :translation-x="translationX"
              :translation-y="translationY"
              :tile-size="tileSize"
              :set-default-tile-size="setDefaultTileSize"
            />
          </VCol>
          <VCol
            class="d-flex align-center"
            cols="12"
            md="4"
          >
            <VWindow
              v-model="currentSection"
              style="inline-size: 100%;"
              :touch="false"
            >
              <VWindowItem value="categories">
                <div style="inline-size: 100%;">
                  <VRow>
                    <VCol>
                      <div
                        class="d-flex align-center text-gray text-body-2"
                        style="margin-block-end: 35px;"
                      >
                        <h6 class="text-body-2">
                          <b>Categories</b>
                        </h6>
                      </div>
                      <h1 class="text-h4">
                        Choose Stone Category
                      </h1>
                      <p class="text-body-2 mt-3">
                        Please choose a stone category you want to apply on the wall.
                      </p>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol
                      v-for="(stone, index) in stones"
                      :key="index"
                    >
                      <div
                        style="position: relative; cursor: pointer;"
                        class="d-flex justify-center align-center"
                        @click="selectStone(stone)"
                      >
                        <div style="position: absolute; z-index: 2; color: white;">
                          <b>{{ stone.name }}</b>
                        </div>
                        <VImg
                          :src="stone.image"

                          height="5rem"
                          cover
                          style="border-radius: 10px; min-inline-size:12rem"
                        />
                      </div>
                    </VCol>
                  </VRow>
                </div>
              </VWindowItem>
              <VWindowItem value="colors">
                <div>
                  <VRow>
                    <VCol>
                      <div
                        class="d-flex align-center text-gray text-body-2"
                        style="margin-block-end: 35px;"
                      >
                        <h6 class="text-body-2">
                          <span @click="currentSection = 'categories'">Categories </span><VIcon icon="mdi-chevron-right" /> <b>Colors</b>
                        </h6>
                      </div>

                      <h1 class="text-h4">
                        Choose Stone Color
                      </h1>
                      <p class="text-body-2 mt-3">
                        Please choose only one stone color you want to apply on the wall.
                      </p>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol
                      v-for="(stone, index) in currentStone.colors"
                      :key="index"
                      style="position: relative; cursor: pointer;"
                      class="d-flex justify-center align-center"
                      @click="selectColor(stone)"
                    >
                      <div style="position: absolute; z-index: 2; color: white;">
                        <b>{{ stone.name }}</b>
                      </div>
                      <VImg
                        :src="stone.image_thumbnail"

                        height="5rem"
                        cover
                        style="border-radius: 10px; min-inline-size:12rem"
                      />
                    </VCol>
                  </VRow>
                </div>
              </VWindowItem>
              <VWindowItem
                v-if="true"
                value="configuration"
              >
                <div>
                  <VRow>
                    <VCol>
                      <div
                        class="d-flex align-center text-gray text-body-2"
                        style="margin-block-end: 35px;"
                      >
                        <h6 class="text-body-2">
                          <span @click="currentSection = 'categories'">Categories </span><VIcon icon="mdi-chevron-right" /> <span @click="currentSection = 'colors'">Colors </span><VIcon icon="mdi-chevron-right" /><b>Configuration</b>
                        </h6>
                      </div>

                      <VRow>
                        <VCol>
                          <h1 class="d-flex align-center justify-space-between text-h4">
                            Configure wall
                          </h1>
                        </VCol>
                        <VCol class="d-block justify-end align-center d-md-flex">
                          <VBtn
                            variant="outlined"
                            @click="reset"
                          >
                            Reset
                          </VBtn>
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>
                  <VRow class="flex-column ma-0 mt-4 ml-n2">
                    <div>
                      <div class=" ml-2">
                        Rotation
                      </div>

                      <VSlider
                        v-model="rotation"
                        prepend-icon="mdi-rotate-3d-variant"
                        thumb-label
                        :max="180"
                        :min="-180"
                        :step="0.1"
                      >
                        <template #append>
                          <VTextField
                            v-model="rotation"
                            density="compact"
                            style="inline-size: 90px"
                            type="number"
                            variant="outlined"
                            hide-details
                          />
                        </template>
                      </VSlider>
                    </div>
                    <div>
                      <div class=" ml-2 mt-2">
                        Warp Perspective X
                      </div>

                      <VSlider
                        v-model="translationX"
                        prepend-icon="mdi-axis-z-rotate-clockwise"
                        thumb-label
                        :max="100"
                        :min="-100"
                        :step="0.1"
                      >
                        <template #append>
                          <VTextField
                            v-model="translationX"
                            density="compact"
                            style="inline-size: 90px"
                            type="number"
                            variant="outlined"
                            hide-details
                          />
                        </template>
                      </VSlider>
                    </div>
                    <div>
                      <div class=" ml-2 mt-2">
                        Warp Perspective Y
                      </div>

                      <VSlider
                        v-model="translationY"
                        prepend-icon="mdi-horizontal-rotate-clockwise"
                        thumb-label
                        :max="100"
                        :min="-100"
                        :step="0.1"
                      >
                        <template #append>
                          <VTextField
                            v-model="translationY"
                            density="compact"
                            style="inline-size: 90px"
                            type="number"
                            variant="outlined"
                            hide-details
                          />
                        </template>
                      </VSlider>
                    </div>
                    <div>
                      <div class=" ml-2 mt-2">
                        Tile Size
                      </div>

                      <VSlider
                        v-model="tileSize"
                        prepend-icon="mdi-wall"
                        thumb-label
                        :max="4"
                        :min="1"
                        :step="1"
                      >
                        <template #append>
                          <VTextField
                            v-model="tileSize"
                            density="compact"
                            style="inline-size: 90px"
                            type="number"
                            variant="outlined"
                            hide-details
                          />
                        </template>
                      </VSlider>
                    </div>
                  </VRow>
                </div>
              </VWindowItem>
              <VRow>
                <VCol class="d-block gap-x-2 mt-5 justify-end d-md-flex">
                  <VBtn
                    variant="outlined"
                    class="mt-2 mx-1"
                    @click="saveWall('/manual-visualizer')"
                  >
                    Select Another wall
                  </VBtn>

                  <VBtn
                    class="mt-2 mx-1"
                    :loading="loading"
                    :disabled="selectedColor == null"
                    @click="() => {
                      loading = true
                      VisualizerReplaceWallRef.next(selectedCategory, selectedColor)
                    }"
                  >
                    Next
                  </VBtn>

                  <!--
                    <VBtn @click="downloadimage">
                    Finish
                    </VBtn>
                  -->
                </VCol>
              </VRow>
            </VWindow>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VDialog v-model="isLoadingOpen">
      <VCard
        max-width="500"
        min-width="300"
        class="mx-auto w-100"
      >
        <VCardText class="d-flex justify-space-center flex-column align-center text-center mt-3">
          <div class="loader" />
          <h6 class="text-h6 mt-3">
            Changing the wall...
          </h6>
          <p class="body-text-2">
            Hang tight! We're in the process of visualizing your chosen wall variant for you.
          </p>
        </VCardText>
      </VCard>
    </VDialog>
  </section>
</template>

<style lang="scss" scoped>
section{
  margin: 3rem;

  @media (max-width: 60rem) {
    margin-inline: 1rem;
  }
}

.loader{
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  block-size:2rem;
  border-block-start: 6px solid rgb(41,77,32);
  inline-size:2rem
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% {transform: rotate(360deg) }
}
</style>

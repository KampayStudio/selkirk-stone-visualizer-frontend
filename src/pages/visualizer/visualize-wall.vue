<script setup lang="ts">
import VisualizerReplaceWall from '@/layouts/components/visualizer/VisualizerReplaceWall.vue'
import axiosIns from '@/plugins/axios'

const router = useRouter()

const VisualizerReplaceWallRef = ref(null)

const stones = ref([
  {
    name: 'Aged Brick',
    image: '/temp/stones/aged_brick/Ashen.png',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Ashen',
        image: '/temp/stones/aged_brick/Ashen.png',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/aged_brick/Bisque.png',
        show: true,
      },
      {
        name: 'Brownstone',
        image: '/temp/stones/aged_brick/Brownstone.png',
        show: true,
      },
      {
        name: 'Coral',
        image: '/temp/stones/aged_brick/Coral.png',
        show: true,
      },
      {
        name: 'Ebony',
        image: '/temp/stones/aged_brick/Ebony.png',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/aged_brick/GraniteRidge.png',
        show: true,
      },
      {
        name: 'Old Chicago',
        image: '/temp/stones/aged_brick/old_chicago.png',
        show: true,
      },
      {
        name: 'Oxford',
        image: '/temp/stones/aged_brick/Oxford.png',
        show: true,
      },
      {
        name: 'Winterton',
        image: '/temp/stones/aged_brick/Winterton.png',
        show: true,
      },
    ],
  },
  {
    name: 'Chiseled Limestone',
    image: '/temp/stones/chiseled_limestone/Alabaster.png',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alabaster',
        image: '/temp/stones/chiseled_limestone/Alabaster.png',
        show: true,
      },
      {
        name: 'Alpine',
        image: '/temp/stones/chiseled_limestone/Alpine.png',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/chiseled_limestone/Bisque.png',
        show: true,
      },
      {
        name: 'Charcoal',
        image: '/temp/stones/chiseled_limestone/Charcoal.png',
        show: true,
      },
      {
        name: 'Conifer',
        image: '/temp/stones/chiseled_limestone/Conifer.png',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/chiseled_limestone/Durango\ Brown.png',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/chiseled_limestone/Granite\ Ridge.png',
        show: true,
      },
      {
        name: 'Sahara',
        image: '/temp/stones/chiseled_limestone/Sahara.png',
        show: true,
      },
      {
        name: 'Sandstone',
        image: '/temp/stones/chiseled_limestone/Sandstone.png',
        show: true,
      },

    ],
  },
  {
    name: 'Contemporary Brick',
    image: '/temp/stones/contemporary_brick/CB_Ashen.png',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Ashen',
        image: '/temp/stones/contemporary_brick/CB_Ashen.png',
        show: true,
      },
      {
        name: 'Brownstone',
        image: '/temp/stones/contemporary_brick/CB_Brownstone.png',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/contemporary_brick/CB_Bisque.png',
        show: true,
      },
      {
        name: 'Coral',
        image: '/temp/stones/contemporary_brick/CB_Coral.png',
        show: true,
      },
      {
        name: 'Ebony',
        image: '/temp/stones/contemporary_brick/CB_Ebony.png',
        show: true,
      },
    ],
  },
  {
    name: 'Country Cliffstone',
    image: '/temp/stones/country_cliffstone/CC_Alabaster.png',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alabaster',
        image: '/temp/stones/country_cliffstone/CC_Alabaster.png',
        show: true,
      },
      {
        name: 'Alpine',
        image: '/temp/stones/country_cliffstone/CC_Alpine.png',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/country_cliffstone/CC_Bisque.png',
        show: true,
      },
      {
        name: 'Bow Valley',
        image: '/temp/stones/country_cliffstone/CC_Bow\ Valley.png',
        show: true,
      },
      {
        name: 'Driftwood',
        image: '/temp/stones/country_cliffstone/CC_Driftwood.png',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/country_cliffstone/CC_Durango\ Brown.png',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/country_cliffstone/CC_Granite\ Bridge.png',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/country_cliffstone/CC_Montana\ Slate.png',
        show: true,
      },
      {
        name: 'Rundle',
        image: '/temp/stones/country_cliffstone/CC_Rundle.png',
        show: true,
      },
    ],
  },
  {
    name: 'Field Stone',
    image: '/temp/stones/field_stone/F_Alpine.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alpine',
        image: '/temp/stones/field_stone/F_Alpine.jpg',
        show: true,
      },
      {
        name: 'Aspen',
        image: '/temp/stones/field_stone/F_Aspen.jpg',
        show: true,
      },
      {
        name: 'Bitteroot',
        image: '/temp/stones/field_stone/F_Bitteroot.jpg',
        show: true,
      },
      {
        name: 'Driftwood',
        image: '/temp/stones/field_stone/F_Driftwood.jpg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/field_stone/F_Durango\ Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/field_stone/F_Granite Ridge.jpg',
        show: true,
      },
    ],
  },
  {
    name: 'Glacier Stone',
    image: '/temp/stones/glacier_stone/GlacierStone_Aspen.png',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Aspen',
        image: '/temp/stones/glacier_stone/GlacierStone_Aspen.png',
        show: true,
      },
      {
        name: 'Biteroot',
        image: '/temp/stones/glacier_stone/GlacierStone_Biteroot.png',
        show: true,
      },
      {
        name: 'Northwest',
        image: '/temp/stones/glacier_stone/GlacierStone_Northwest\ Blend.png',
        show: true,
      },
    ],
  },
  {
    name: 'Mountain Ledge',
    image: '/temp/stones/mountain_ledge/ML_Alpine.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alpine',
        image: '/temp/stones/mountain_ledge/ML_Alpine.jpg',
        show: true,
      },
      {
        name: 'Charcoal',
        image: '/temp/stones/mountain_ledge/ML_Charcoal.jpg',
        show: true,
      },
      {
        name: 'Cool River',
        image: '/temp/stones/mountain_ledge/ML_Cool\ River.jpg',
        show: true,
      },
      {
        name: 'Driftwood',
        image: '/temp/stones/mountain_ledge/ML_Driftwood.jpg',
        show: true,
      },
      {
        name: 'Durango',
        image: '/temp/stones/mountain_ledge/ML_Durango.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/mountain_ledge/ML_Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/mountain_ledge/ML_Montana\ Slate.jpg',
        show: true,
      },
      {
        name: 'Rocky Mountain',
        image: '/temp/stones/mountain_ledge/ML_Rocky\ Mountain.jpg',
        show: true,
      },
      {
        name: 'Rundle',
        image: '/temp/stones/mountain_ledge/ML_Rundle.jpg',
        show: true,
      },
      {
        name: 'Valley',
        image: '/temp/stones/mountain_ledge/ML_Valley.jpg',
        show: true,
      },

    ],
  },
  {
    name: 'Northen Ledgestone',
    image: '/temp/stones/northern_ledgestone/NL_Alberta.png',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alberta',
        image: '/temp/stones/northern_ledgestone/NL_Alberta.png',
        show: true,
      },
      {
        name: 'Alpine',
        image: '/temp/stones/northern_ledgestone/NL_Alpine.png',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/northern_ledgestone/NL_Bisque.png',
        show: true,
      },
      {
        name: 'Bonner',
        image: '/temp/stones/northern_ledgestone/NL_Bonner.png',
        show: true,
      },
      {
        name: 'Bow Valley',
        image: '/temp/stones/northern_ledgestone/NL_Bow\ Valley.png',
        show: true,
      },
      {
        name: 'Charcoal',
        image: '/temp/stones/northern_ledgestone/NL_Charcoal.png',
        show: true,
      },
      {
        name: 'Coal River',
        image: '/temp/stones/northern_ledgestone/NL_Coal\ River.png',
        show: true,
      },
      {
        name: 'Driftwood',
        image: '/temp/stones/northern_ledgestone/NL_Driftwood.png',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/northern_ledgestone/NL_Durango\ Brown.png',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/northern_ledgestone/NL_Granite\ Ridge.png',
        show: true,
      },
      {
        name: 'Harvest Blend',
        image: '/temp/stones/northern_ledgestone/NL_Harvest\ Blend.png',
        show: true,
      },
      {
        name: 'High Country',
        image: '/temp/stones/northern_ledgestone/NL_High\ Country_.png',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/northern_ledgestone/NL_Montana\ Slate.png',
        show: true,
      },
      {
        name: 'Rocky Mountain',
        image: '/temp/stones/northern_ledgestone/NL_Rocky\ Mountain.png',
        show: true,
      },
      {
        name: 'Rundle',
        image: '/temp/stones/northern_ledgestone/NL_Rundle.png',
        show: true,
      },

    ],
  },
  {
    name: 'Rustic Ledgestone',
    image: '/temp/stones/rustic_ledgestone/RL_Alpine.png',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alpine',
        image: '/temp/stones/rustic_ledgestone/RL_Alpine.png',
        show: true,
      },
      {
        name: 'Biteroot',
        image: '/temp/stones/rustic_ledgestone/RL_Biteroot.png',
        show: true,
      },
      {
        name: 'Bonner Country',
        image: '/temp/stones/rustic_ledgestone/RL_Bonner\ Country.png',
        show: true,
      },
      {
        name: 'Charcoal',
        image: '/temp/stones/rustic_ledgestone/RL_Charcoal.png',
        show: true,
      },
      {
        name: 'Coal River',
        image: '/temp/stones/rustic_ledgestone/RL_Coal\ River.png',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/rustic_ledgestone/RL_Durango\ Brown.png',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/rustic_ledgestone/RL_Granite Ridge.png',
        show: true,
      },
      {
        name: 'Harvest Blend',
        image: '/temp/stones/rustic_ledgestone/RL_Harvest\ Blend.png',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/rustic_ledgestone/RL_Montana\ Slate.png',
        show: true,
      },

    ],
  },
  {
    name: 'Shadow Ledgestone',
    image: '/temp/stones/shadow_ledgestone/SL_Alpine.png',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alpine',
        image: '/temp/stones/shadow_ledgestone/SL_Alpine.png',
        show: true,
      },
      {
        name: 'Biteroot',
        image: '/temp/stones/shadow_ledgestone/SL_Biteroot.png',
        show: true,
      },
      {
        name: 'Bonner Country',
        image: '/temp/stones/shadow_ledgestone/SL_Bonner\ Country.png',
        show: true,
      },
      {
        name: 'Conifer',
        image: '/temp/stones/shadow_ledgestone/SL_Conifer.png',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/shadow_ledgestone/SL_Durango Brown.png',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/shadow_ledgestone/SL_Granite\ Ridge.png',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/shadow_ledgestone/SL_Montana\ Slate.png',
        show: true,
      },
    ],
  },
  {
    name: 'Strip Ledge',
    image: '/temp/stones/strip_ledge/SL_Alabaster.png',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alabaster',
        image: '/temp/stones/strip_ledge/SL_Alabaster.png',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/strip_ledge/SL_Bisque.png',
        show: true,
      },
      {
        name: 'Dark Ocean',
        image: '/temp/stones/strip_ledge/SL_Ocean.png',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/strip_ledge/SL_Granite\ Ridge.png',
        show: true,
      },
    ],
  },

])

const currentStone = ref()
const currentSection = ref('categories')
const selectedColor = ref()
const selectedCategory = ref()
const rotation = ref(0)
const translationX = ref(0)
const translationY = ref(0)
const tileSize = ref(3)
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

const convertImageToBase64 = async imageUrl => {
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

const selectStone = async (stone: any) => {
  currentStone.value = stone
  currentSection.value = 'colors'
  selectedCategory.value = stone.name
}

const selectColor = async (stone: any) => {
  isLoadingOpen.value = true
  currentSection.value = 'configuration'

  selectedColor.value = { ...stone }
  selectedColor.value.image = await convertImageToBase64(selectedColor.value.image)

  changeWall()

  isLoadingOpen.value = false

  const response = await axiosIns.post('https://selkirkappapi.azurewebsites.net/api/analytics/product_analytics/', {
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

let defaultTileSize = 3

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
    <VCard>
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
                        :src="stone.image"

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
                    <div class="text-caption ml-2">
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

                    <div class="text-caption ml-2 mt-2">
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

                    <div class="text-caption ml-2 mt-2">
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

                    <div class="text-caption ml-2 mt-2">
                      Tile Size
                    </div>

                    <VSlider
                      v-model="tileSize"
                      prepend-icon="mdi-wall"
                      thumb-label
                      :max="25"
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
                  </VRow>
                </div>
              </VWindowItem>
              <VRow>
                <VCol class="d-block gap-x-2 mt-5 justify-end d-md-flex">
                  <VBtn
                    variant="outlined"
                    class="mt-2"
                    @click="saveWall('/visualizer')"
                  >
                    Select Another wall
                  </VBtn>

                  <VBtn
                    class="mt-2"
                    @click="saveWall('/visualizer/dimension')"
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

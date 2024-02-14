<script setup lang="ts">
import VisualizerReplaceWall from '@/layouts/components/visualizer/VisualizerReplaceWall.vue'

const VisualizerReplaceWallRef = ref(null)

const stones = ref([
  {
    name: 'Aged Brick',
    image: '/temp/stones/aged_brick/Ashen.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Ashen',
        image: '/temp/stones/aged_brick/Ashen.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/aged_brick/Bisque.jpg',
        show: true,
      },
      {
        name: 'Brownstone',
        image: '/temp/stones/aged_brick/Brownstone.jpg',
        show: true,
      },
      {
        name: 'Coral',
        image: '/temp/stones/aged_brick/Coral.jpg',
        show: true,
      },
      {
        name: 'Ebony',
        image: '/temp/stones/aged_brick/Ebony.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/aged_brick/Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Old Chicago',
        image: '/temp/stones/aged_brick/old_chicago.jpg',
        show: true,
      },
      {
        name: 'Oxford',
        image: '/temp/stones/aged_brick/Oxford.jpg',
        show: true,
      },
      {
        name: 'Winterton',
        image: '/temp/stones/aged_brick/Winterton.jpg',
        show: true,
      },
    ],
  },
  {
    name: 'Chiseled Limestone',
    image: '/temp/stones/chiseled_limestone/Alabaster.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alabaster',
        image: '/temp/stones/chiseled_limestone/Alabaster.jpg',
        show: true,
      },
      {
        name: 'Alpine',
        image: '/temp/stones/chiseled_limestone/Alpine.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/chiseled_limestone/Bisque.jpg',
        show: true,
      },
      {
        name: 'Charcoal',
        image: '/temp/stones/chiseled_limestone/Charcoal.jpg',
        show: true,
      },
      {
        name: 'Conifer',
        image: '/temp/stones/chiseled_limestone/Conifer.jpg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/chiseled_limestone/Durango\ Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/chiseled_limestone/Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Sahara',
        image: '/temp/stones/chiseled_limestone/Sahara.jpg',
        show: true,
      },
      {
        name: 'Sandstone',
        image: '/temp/stones/chiseled_limestone/Sandstone.jpg',
        show: true,
      },

    ],
  },
  {
    name: 'Contemporary Brick',
    image: '/temp/stones/contemporary_brick/Ashen.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Ashen',
        image: '/temp/stones/contemporary_brick/CB_Ashen.jpg',
        show: true,
      },
      {
        name: 'Brownstone',
        image: '/temp/stones/contemporary_brick/CB_Brownstone.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/contemporary_brick/CB_Bisque.jpg',
        show: true,
      },
      {
        name: 'Coral',
        image: '/temp/stones/contemporary_brick/CB_Coral.jpg',
        show: true,
      },
      {
        name: 'Ebony',
        image: '/temp/stones/contemporary_brick/CB_Ebony.jpg',
        show: true,
      },
    ],
  },
  {
    name: 'Country Cliffstone',
    image: '/temp/stones/country_cliffstone/CC_Alabaster.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alabaster',
        image: '/temp/stones/country_cliffstone/CC_Alabaster.jpg',
        show: true,
      },
      {
        name: 'Alpine',
        image: '/temp/stones/country_cliffstone/CC_Alpine.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/country_cliffstone/CC_Bisque.jpg',
        show: true,
      },
      {
        name: 'Bow Valley',
        image: '/temp/stones/country_cliffstone/CC_Bow\ Valley.jpg',
        show: true,
      },
      {
        name: 'Driftwood',
        image: '/temp/stones/country_cliffstone/CC_Driftwood.jpg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/country_cliffstone/CC_Durango\ Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/country_cliffstone/CC_Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/country_cliffstone/CC_Montana\ Slate.jpg',
        show: true,
      },
      {
        name: 'Rundle',
        image: '/temp/stones/country_cliffstone/CC_Rundle.jpg',
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
    image: '/temp/stones/northern_ledgestone/NL_Alberta.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alberta',
        image: '/temp/stones/northern_ledgestone/NL_Alberta.jpg',
        show: true,
      },
      {
        name: 'Alpine',
        image: '/temp/stones/northern_ledgestone/NL_Alpine.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/northern_ledgestone/NL_Bisque.jpg',
        show: true,
      },
      {
        name: 'Bonner',
        image: '/temp/stones/northern_ledgestone/NL_Bonner.jpg',
        show: true,
      },
      {
        name: 'Bow Valley',
        image: '/temp/stones/northern_ledgestone/NL_Bow\ Valley.jpg',
        show: true,
      },
      {
        name: 'Charcoal',
        image: '/temp/stones/northern_ledgestone/NL_Charcoal.jpg',
        show: true,
      },
      {
        name: 'Coal River',
        image: '/temp/stones/northern_ledgestone/NL_Coal\ River.jpg',
        show: true,
      },
      {
        name: 'Driftwood',
        image: '/temp/stones/northern_ledgestone/NL_Driftwood.jpg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/northern_ledgestone/NL_Durango\ Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/northern_ledgestone/NL_Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Harvest Blend',
        image: '/temp/stones/northern_ledgestone/NL_Harvest\ Blend.jpg',
        show: true,
      },
      {
        name: 'High Country',
        image: '/temp/stones/northern_ledgestone/NL_HIgh\ Country.jpg',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/northern_ledgestone/NL_Montana\ Slate.jpg',
        show: true,
      },
      {
        name: 'Rocky Mountain',
        image: '/temp/stones/northern_ledgestone/NL_Rocky\ Mountain.jpg',
        show: true,
      },
      {
        name: 'Rundle',
        image: '/temp/stones/northern_ledgestone/NL_Rundle.jpg',
        show: true,
      },

    ],
  },
  {
    name: 'Rustic Ledgestone',
    image: '/temp/stones/rustic_ledgestone/RL_Alpine.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alpine',
        image: '/temp/stones/rustic_ledgestone/RL_Alpine.jpg',
        show: true,
      },
      {
        name: 'Biteroot',
        image: '/temp/stones/rustic_ledgestone/RL_Biteroot.jpg',
        show: true,
      },
      {
        name: 'Bonner Country',
        image: '/temp/stones/rustic_ledgestone/RL_Bonner\ Country.jpg',
        show: true,
      },
      {
        name: 'Charcoal',
        image: '/temp/stones/rustic_ledgestone/RL_Charcoal.jpg',
        show: true,
      },
      {
        name: 'Coal River',
        image: '/temp/stones/rustic_ledgestone/RL_Coal\ River.jpg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/rustic_ledgestone/RL_Durango\ Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/rustic_ledgestone/RL_Granite Ridge.jpg',
        show: true,
      },
      {
        name: 'Harvest Blend',
        image: '/temp/stones/rustic_ledgestone/RL_Harvest\ Blend.jpg',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/rustic_ledgestone/RL_Montana\ Slate.jpg',
        show: true,
      },

    ],
  },
  {
    name: 'Shadow Ledgestone',
    image: '/temp/stones/shadow_ledgestone/SL_Alpine.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alpine',
        image: '/temp/stones/shadow_ledgestone/SL_Alpine.jpg',
        show: true,
      },
      {
        name: 'Biteroot',
        image: '/temp/stones/shadow_ledgestone/SL_Biteroot.jpg',
        show: true,
      },
      {
        name: 'Bonner Country',
        image: '/temp/stones/shadow_ledgestone/SL_Bonner\ Country.jpg',
        show: true,
      },
      {
        name: 'Conifer',
        image: '/temp/stones/shadow_ledgestone/SL_Conifer.jpeg',
        show: true,
      },
      {
        name: 'Durango Brown',
        image: '/temp/stones/shadow_ledgestone/SL_Durango Brown.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/shadow_ledgestone/SL_Granite\ Ridge.jpg',
        show: true,
      },
      {
        name: 'Montana Slate',
        image: '/temp/stones/shadow_ledgestone/SL_Montana\ Slate.jpg',
        show: true,
      },
    ],
  },
  {
    name: 'Strip Ledge',
    image: '/temp/stones/strip_ledge/SL_Alabaster.jpg',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alabaster',
        image: '/temp/stones/strip_ledge/SL_Alabaster.jpg',
        show: true,
      },
      {
        name: 'Bisque',
        image: '/temp/stones/strip_ledge/SL_Bisque.jpg',
        show: true,
      },
      {
        name: 'Dark Ocean',
        image: '/temp/stones/strip_ledge/SL_Dark\ Ocean.jpg',
        show: true,
      },
      {
        name: 'Granite Ridge',
        image: '/temp/stones/strip_ledge/SL_Granite\ Ridge.jpg',
        show: true,
      },
    ],
  },

])

const currentStone = ref()
const currentSection = ref('categories')
const selectedColor = ref()

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

const selectStone = async (stone: any) => {
  currentStone.value = stone
  currentSection.value = 'colors'
}

const selectColor = async (stone: any) => {
  selectedColor.value = { ...stone }
  selectedColor.value.image = await convertImageToBase64(selectedColor.value.image)

  if (VisualizerReplaceWallRef.value)
    VisualizerReplaceWallRef.value.changeWall(selectedColor.value)
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
            class="d-flex align-center"
          >
            <VisualizerReplaceWall ref="VisualizerReplaceWallRef" />
          </VCol>
          <VCol
            class="d-flex align-center"
            cols="12"
            md="4"
          >
            <VWindow v-model="currentSection">
              <VWindowItem value="categories">
                <div>
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
                      style="position: relative; max-inline-size: 12rem;"
                      class="d-flex justify-center align-center"
                      @click="selectStone(stone)"
                    >
                      <div style="position: absolute; z-index: 2; color: white;">
                        <b>{{ stone.name }}</b>
                      </div>
                      <VImg
                        :src="stone.image"
                        width="12rem"
                        height="5rem"
                        cover
                        style="border-radius: 10px;"
                      />
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
                      style="position: relative; max-inline-size: 12rem;"
                      class="d-flex justify-center align-center"
                      @click="selectColor(stone)"
                    >
                      <div style="position: absolute; z-index: 2; color: white;">
                        <b>{{ stone.name }}</b>
                      </div>
                      <VImg
                        :src="stone.image"
                        width="12rem"
                        height="5rem"
                        cover
                        style="border-radius: 10px;"
                      />
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol class="d-flex gap-x-2">
                      <RouterLink to="/visualizer">
                        <VBtn variant="outlined">
                          Back
                        </VBtn>
                      </RouterLink>

                      <VBtn>
                        Next
                      </VBtn>
                    </VCol>
                  </VRow>
                </div>
              </VWindowItem>
            </VWindow>
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

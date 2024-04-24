<script setup lang="ts">
import axiosIns from '@/plugins/axios'

const loading = ref(false)
const VisualizerReplaceWallRef = ref(null)
const selectedImage = JSON.parse(sessionStorage.getItem('visualizeImage'))
const image = ref(selectedImage.image)
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
const selectedColor = ref()
const selectedCategory = ref()
const isLoadingOpen = ref(false)

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

const selectStone = async (stone: any) => {
  currentStone.value = stone
  currentSection.value = 'colors'
  selectedCategory.value = stone.name
}

const changeImage = (category, color) => {
  // Access the category using bracket notation since it's a variable
  const categoryVariants = selectedImage.variants[category]

  // Ensure the category exists and has an array of variants
  if (categoryVariants) {
    // Find the variant within the category array that matches the selected color
    const variant = categoryVariants.find(v => v.color.trim().toLowerCase() === color.trim().toLowerCase())

    // If a matching variant is found, update the image source
    if (variant) {
      image.value = variant.image
      console.log('Image changed to:', variant.image)
    }
    else {
      // If no matching variant is found
      console.log('No matching variant found for the color:', color)
    }
  }
  else {
    // If the category does not exist in the variants object
    console.log('No such category found:', category)
  }
}

const selectColor = async (stone: any) => {
  insightTrackEvent(selectedCategory.value, stone.name, stone.id)
  currentSection.value = 'categories'
  selectedColor.value = stone.name
  changeImage(selectedCategory.value, stone.name)

  const response = await axiosIns.post('https://selkirkappapi.azurewebsites.net/api/analytics/product_analytics/', {
    stone_id: 0,
    stone_category: selectedCategory.value,
    stone_color: selectedColor.value.name,
  })
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
            <VImg :src="image" />
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
                        :src="stone.image"

                        height="5rem"
                        cover
                        style="border-radius: 10px; min-inline-size:12rem"
                      />
                    </VCol>
                  </VRow>
                </div>
              </VWindowItem>
              <VRow>
                <VCol class="d-block gap-x-2 mt-5 justify-end d-md-flex">
                  <VBtn
                    variant="outlined"
                    class="mt-2 mx-1"
                    @click="saveWall('/visualizer')"
                  >
                    Select Another wall
                  </VBtn>

                  <VBtn
                    class="mt-2 mx-1"
                    @click="saveWall('/visualizer/compare')"
                  >
                    Next
                  </VBtn>
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

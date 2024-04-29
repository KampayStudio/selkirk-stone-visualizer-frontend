<script setup lang="ts">
import axiosIns from '@/plugins/axios'

const loading = ref(false)
const selectedImage = JSON.parse(sessionStorage.getItem('visualizeImage'))
const image = ref(selectedImage.hover)
const stones = ref([])
const router = useRouter()

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

const selectColor = async (color: any) => {
  // Reset isSelected for all colors in the current stone
  currentStone.value.colors.forEach(c => c.isSelected = false)

  // Set isSelected for the selected color
  color.isSelected = true

  insightTrackEvent(selectedCategory.value, color.name, color.id)
  selectedColor.value = color.name
  changeImage(selectedCategory.value, color.name)

  const response = await axiosIns.post('https://selkirkappapi.azurewebsites.net/api/analytics/product_analytics/', {
    stone_id: 0,
    stone_category: selectedCategory.value,
    stone_color: selectedColor.value.name,
  })
}

const reset = () => {
  currentSection.value = 'categories'
  image.value = selectedImage.hover
}

const next = () => {
  sessionStorage.setItem('processedImage', image.value)
  sessionStorage.setItem('processedData', JSON.stringify({
    category: sessionStorage.getItem('category'),
    stones: [
      {
        profile: 'Aged Brick',
        color: 'Aspen',
      },
    ],
  }))
  router.push('/visualizer/compare')
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
            <VImg
              :src="image"
              style="max-block-size: 75vh;"
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
                          <b>Profile</b>
                        </h6>
                      </div>
                      <h1 class="text-h4">
                        Choose Stone Profile
                      </h1>
                      <p class="text-body-2 mt-3">
                        Please choose a stone profile you want to apply on the wall.
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
                        <img
                          :src="stone.image"
                          style="
                          border-radius: 10px;
                          block-size: 5rem;
                          inline-size: 15rem;
                          object-fit: cover;
                        "
                        >
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
                          <span @click="currentSection = 'categories'">Profile </span><VIcon icon="mdi-chevron-right" /> <b>Colors</b>
                        </h6>
                      </div>

                      <h1 class="text-h4">
                        Choose Stone Color
                      </h1>
                      <p class="text-body-2 mt-3">
                        Please choose only one stone color you want to apply on the wall.
                      </p>
                      <p class="text-body-2">
                        <b>Selected Stone Profile: </b>{{ selectedCategory ? selectedCategory : 'No Profile Selected' }}
                      </p>
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol
                      v-for="(color, index) in currentStone.colors"
                      :key="index"
                      style="position: relative; cursor: pointer;"
                      class="d-flex justify-center align-center"
                      @click="selectColor(color)"
                    >
                      <!-- <div style="position: absolute; z-index: 2;" /> -->
                      <div
                        :class="{ 'selected-color': color.isSelected }"
                        style="position: absolute; z-index: 3; color: white;"
                      >
                        <b>{{ color.name }}</b>
                      </div>
                      <img
                        :src="color.image"
                        style="
                          border-radius: 10px;
                          block-size: 5rem;
                          inline-size: 15rem;
                          object-fit: cover;

                        "
                      >
                    </VCol>
                  </VRow>
                </div>
              </VWindowItem>
              <VRow>
                <VCol class="d-block gap-x-2 mt-5 justify-end d-md-flex">
                  <VBtn
                    v-if="!(currentSection === 'categories')"
                    variant="outlined"
                    class="mt-2 mx-1"
                    @click="reset"
                  >
                    Select Stone Profile
                  </VBtn>

                  <VBtn
                    class="mt-2 mx-1"
                    @click="next"
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

.selected-color {
  display: flex; /* Use flexbox to align items */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  border-radius: 10px;
  background-color: rgba(26, 78, 25, 60%); /* Light white background for visibility */
  block-size: 5rem;
  inline-size: 15rem;
  text-align: center;
}
</style>

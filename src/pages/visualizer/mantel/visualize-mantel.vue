<script setup lang="ts">
import VisualizerReplaceWall from '@/layouts/components/visualizer/mantel/VisualizerReplaceWall.vue'

const router = useRouter()

const VisualizerReplaceWallRef = ref(null)

const mantels = ref([
  {
    name: 'Rustic Brown',
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1624496189388-O28QGAX38BXU0WVOT91Y/Rustic%2BBrown%2BCropped%2BSwatch.jpg?format=700w',
    status: true,
    isInStock: true,
  },
  {
    name: 'Weathered Gray',
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1624495871102-BFWQO0WQ1ULDA3343NWC/Weathered%2BGrey%2BCropped%2BSwatch%2B.jpg?format=750w',
    status: true,
    isInStock: true,
  },
  {
    name: 'Barnwood Cropped',
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1624496279143-NDRFMH78HOFH6GT34HTC/Barnwood%2BCropped%2BSwatch.jpg?format=750w',
    status: true,
    isInStock: true,
  },

])

const selectedColor = ref()
const isLoadingOpen = ref(false)

const changeWall = () => {
  if (!selectedColor.value || !VisualizerReplaceWallRef.value)
    return

  VisualizerReplaceWallRef.value.changeWall()
}

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

const saveMantel = async routeTo => {
  await VisualizerReplaceWallRef.value.saveMantel()
  router.replace(routeTo)
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
            <VisualizerReplaceWall ref="VisualizerReplaceWallRef" />
          </VCol>
          <VCol
            class="d-flex align-center flex-column"
            cols="12"
            md="4"
          >
            <div style="inline-size: 100%;">
              <VRow>
                <VCol>
                  <h1 class="text-h4">
                    Choose Mantel Color
                  </h1>
                  <p class="text-body-2 mt-3">
                    Please choose a mantel color you want to apply on the mantel.
                  </p>
                </VCol>
              </VRow>
              <VRow>
                <VCol
                  v-for="(mantel, index) in mantels"
                  :key="index"
                >
                  <div
                    style="position: relative; cursor: pointer;"
                    class="d-flex justify-center align-center"
                    @click="VisualizerReplaceWallRef.loadMantelColor(mantel.image)"
                  >
                    <div style="position: absolute; z-index: 2; color: white;">
                      <b>{{ mantel.name }}</b>
                    </div>
                    <VImg
                      :src="mantel.image"

                      height="5rem"
                      cover
                      style="border-radius: 10px; min-inline-size:12rem"
                    />
                  </div>
                </VCol>
              </VRow>
            </div>
            <VRow>
              <VCol class="d-flex gap-x-2 mt-5 justify-end">
                <VBtn variant="outlined">
                  Select Another Mantel
                </VBtn>

                <VBtn @click="saveMantel('/visualizer/dimension')">
                  Next
                </VBtn>
              </VCol>
            </VRow>
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
            Applying changes...
          </h6>
          <p class="body-text-2">
            Hang tight! We're in the process of visualizing your chosen mantel color for you.
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

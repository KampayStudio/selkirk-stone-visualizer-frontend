<script setup lang="ts">
const selectedSection = ref()
const route = useRoute()
const router = useRouter()

const interior = ref([])

const exterior = ref([])

const mantle = ref([])

const goToVisualizer = (sampleImage: any) => {
  localStorage.setItem('visualizeImage', JSON.stringify(sampleImage))
  router.replace(route.query.to ? String(route.query.to) : '/visualizer')
}
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
              <VTab value="interior">
                Interior
              </VTab>
              <VTab value="exterior">
                Exterior
              </VTab>
              <VTab value="mantle">
                Non-Combustible Mantle
              </VTab>
            </VTabs>
            <VWindow v-model="selectedSection">
              <!-- Interior -->
              <VWindowItem
                value="interior"
                style="padding: 1rem;"
              >
                <VRow
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in interior"
                    :key="i.image"
                    class="text-center d-flex justify-center flex-column"
                    cols="12"
                    sm="6"
                    md="3"
                    lg="2"
                    style="align-items: center;"
                  >
                    <div class="image-mask image-container">
                      <img
                        :src="i.image"
                        @click="goToVisualizer(i)"
                      >
                      <VCheckbox class="checkbox" />
                    </div>
                    <VLabel
                      class="text-body-2 "
                      style="font-size: .9rem;"
                    >
                      {{ `Total Area: ${Math.ceil(Math.random() * 1000)}sqm.` }}
                    </VLabel>
                  </VCol>
                </VRow>
              </VWindowItem>
              <!-- Exterior -->
              <VWindowItem
                value="exterior"
                style="padding: 1rem;"
              >
                <VRow
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in exterior"
                    :key="i.image"
                    class="text-center"
                    cols="12"
                    sm="6"
                    md="3"
                    lg="2"
                  >
                    <div class="image-mask image-container">
                      <img
                        :src="i.image"
                        @click="goToVisualizer(i)"
                      >
                      <VCheckbox class="checkbox" />
                    </div>
                    <VLabel
                      class="text-p "
                      style=" font-size: .9rem; margin-block-start: .4rem;"
                    >
                      {{ `Total Area: ${Math.ceil(Math.random() * 1000)}sqm.` }}
                    </VLabel>
                  </VCol>
                </VRow>
              </VWindowItem>
              <!-- Mantle -->
              <VWindowItem
                value="mantle"
                style="padding: 1rem;"
              >
                <VRow
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in mantle"
                    :key="i.image"
                    class="text-center"
                    cols="12"
                    sm="6"
                    md="3"
                    lg="2"
                  >
                    <div class="image-mask image-container">
                      <img :src="i.image">
                      <VCheckbox class="checkbox" />
                    </div>
                    <VLabel
                      class="text-p "
                      style=" font-size: .9rem; margin-block-start: .4rem;"
                    >
                      {{ `Total Area: ${Math.ceil(Math.random() * 1000)}sqm.` }}
                    </VLabel>
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
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
  block-size: 8rem;
  inline-size: 12rem;

  img {
    block-size: auto;
    inline-size: 100%;
  }
}
</style>

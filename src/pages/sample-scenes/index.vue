<script setup lang="ts">
const selectedSection = ref()
const route = useRoute()
const router = useRouter()

const interior = ref([
  {
    image: '/temp/interior/sample1.jpeg',
    wall_shape: {
      shapes: [
        [
          { x: 0, y: 70 },
          { x: 420, y: 75 },
          { x: 422, y: 910 },
          { x: 445, y: 911 },
          { x: 444, y: 1008 },
          { x: 424, y: 1018 },
          { x: 424, y: 1064 },
          { x: 364, y: 1064 },
          { x: 354, y: 1034 },
          { x: 354, y: 1034 },
          { x: 318, y: 1069 },
          { x: 318, y: 1069 },
          { x: 285, y: 1058 },
          { x: 285, y: 1058 },
          { x: 160, y: 1038 },
          { x: 0, y: 1088 },
          { x: 0, y: 730 },
          { x: 48, y: 738 },
          { x: 265, y: 738 },
          { x: 265, y: 635 },
          { x: 255, y: 630 },
          { x: 255, y: 460 },
          { x: 243, y: 455 },
          { x: 243, y: 215 },
          { x: 70, y: 215 },
          { x: 70, y: 525 },
          { x: 70, y: 525 },
          { x: 0, y: 485 },
        ],
        [
          { x: 420, y: 10 },
          { x: 860, y: 12 },
          { x: 860, y: 608 },
          { x: 690, y: 608 },
          { x: 690, y: 848 },
          { x: 862, y: 848 },
          { x: 862, y: 915 },
          { x: 420, y: 915 },
        ],
        [
          { x: 420, y: 1020 },
          { x: 860, y: 1020 },
          { x: 860, y: 1065 },
          { x: 420, y: 1065 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 75 },
          { x: 1280, y: 75 },
          { x: 1280, y: 522 },
          { x: 860, y: 522 },
        ],
        [
          { x: 860, y: 522 },
          { x: 1280, y: 522 },
          { x: 1280, y: 652 },
          { x: 1268, y: 656 },
          { x: 1268, y: 1032 },
          { x: 1225, y: 1032 },
          { x: 1215, y: 1100 },
          { x: 1138, y: 1100 },
          { x: 1138, y: 1073 },
          { x: 1092, y: 1052 },
          { x: 1092, y: 1052 },
          { x: 860, y: 1052 },
          { x: 862, y: 848 },
          { x: 692, y: 848 },
          { x: 692, y: 606 },
          { x: 860, y: 606 },
        ],
      ],
    },
  },
])

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
                <!-- Skeleton Loading -->
                <VRow
                  v-if="interior.length === 0"
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in 7"
                    :key="i"
                    class="text-center d-flex justify-center flex-column"
                    cols="12"
                    sm="6"
                    md="3"
                    lg="2"
                    style="align-items: center;"
                  >
                    <div class="image-mask image-container">
                      <PuSkeleton
                        width="200px"
                        height="8rem"
                      />
                    </div>
                    <VLabel
                      class="text-body-2 "
                      style="font-size: .9rem;"
                    >
                      <PuSkeleton width="5rem" />
                    </VLabel>
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
                <!-- Skeleton Loading -->
                <VRow
                  v-if="exterior.length === 0"
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in 7"
                    :key="i"
                    class="text-center d-flex justify-center flex-column"
                    cols="12"
                    sm="6"
                    md="3"
                    lg="2"
                    style="align-items: center;"
                  >
                    <div class="image-mask image-container">
                      <PuSkeleton
                        width="200px"
                        height="8rem"
                      />
                    </div>
                    <VLabel
                      class="text-body-2 "
                      style="font-size: .9rem;"
                    >
                      <PuSkeleton width="5rem" />
                    </VLabel>
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
                <!-- Skeleton Loading -->
                <VRow
                  v-if="mantle.length === 0"
                  class="d-flex"
                  style="justify-content: center;"
                >
                  <VCol
                    v-for="i in 7"
                    :key="i"
                    class="text-center d-flex justify-center flex-column"
                    cols="12"
                    sm="6"
                    md="3"
                    lg="2"
                    style="align-items: center;"
                  >
                    <div class="image-mask image-container">
                      <PuSkeleton
                        width="200px"
                        height="8rem"
                      />
                    </div>
                    <VLabel
                      class="text-body-2 "
                      style="font-size: .9rem;"
                    >
                      <PuSkeleton width="5rem" />
                    </VLabel>
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

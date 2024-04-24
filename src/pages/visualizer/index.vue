<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const selectedImage = ref(JSON.parse(sessionStorage.getItem('visualizeImage')))
const image = ref(selectedImage.value.image)
</script>

<template>
  <section v-if="image">
    <VCard>
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="8"
          >
            <!-- <VisualizerMain :image="image" /> -->
            <VImg
              :src="image"
              style="max-block-size: 75vh;"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
            class="d-flex flex-column justify-center gap-y-3"
          >
            <!--
              <div class="d-flex flex-row gap-x-5">
              <div class="text-sm d-flex align-center gap-x-1">
              <VIcon
              icon="mdi-square"
              color="#38A736"
              /> Detected Wall
              </div>
              <div class="text-sm d-flex align-center gap-x-1">
              <VIcon
              icon="mdi-square"
              color="#D8BF3A"
              /> Added Wall
              </div>
              </div>
            -->
            <!--
              <h6 class="text-h4">
              {{ image.wall_shape.shapes.length }} Detected Walls
              </h6>
            -->
            <h6 class="text-h4">
              Proceed to visualizer
            </h6>
            <!--
              <p class="text-body-2">
              Are you satisfied with the wall detection? <br> Proceeding will not allow further changes.
              </p>
            -->
            <div class="d-flex gap-x-3">
              <!--
                <VBtn
                variant="outlined"
                @click="router.replace(route.query.to ? String(route.query.to) : '/visualizer/edit-wall')"
                >
                Edit Wall
                </VBtn>
              -->
              <VBtn @click="router.replace(route.query.to ? String(route.query.to) : '/visualizer/visualize-wall')">
                Proceed
              </VBtn>
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

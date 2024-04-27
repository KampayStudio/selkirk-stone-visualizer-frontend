<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const selectedImage = ref(JSON.parse(sessionStorage.getItem('visualizeImage')))
const image = ref(selectedImage.value.hover)
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
            <h6 class="text-h4">
              Proceed to visualizer
            </h6>
            <div class="d-flex gap-x-3">
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

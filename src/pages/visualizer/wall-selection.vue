<script setup lang="ts">
import VisualizerMain from '@/layouts/components/visualizer/VisualizerMain.vue'

const route = useRoute()
const router = useRouter()

const image = ref(JSON.parse(localStorage.getItem('visualizeImage')))
</script>

<template>
  <section>
    <VCard>
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="8"
          >
            <VisualizerMain :image="image" />
          </VCol>
          <VCol
            cols="12"
            md="4"
            class="d-flex flex-column justify-center gap-y-3"
          >
            <h6 class="text-h4">
              Select a Wall
            </h6>
            <p class="text-body-2">
              Please choose a wall on the image you <br> want to modify with Selkirk Stone.
            </p>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </section>
</template>

<style lang="scss">
section{
  margin: 3rem;

  @media (max-width: 60rem) {
    margin-inline: 1rem;
  }
}
</style>

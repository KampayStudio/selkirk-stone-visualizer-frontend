<script setup lang="ts">
import localForage from 'localforage'
import VisualizerMain from '@/layouts/components/visualizer/mantel/VisualizerMain.vue'

const route = useRoute()
const router = useRouter()
const image = ref()
const mantels = ref()

onMounted(async () => {
  try {
    const storedImage = await localForage.getItem('visualizeImage')
    const mantelsAnnot = await localForage.getItem('visualizedMantels')
    if (storedImage) {
      try {
        image.value = JSON.parse(storedImage)
        mantels.value = JSON.parse(mantelsAnnot)
      }
      catch (e) {
        console.error('Error parsing image data:', e)
      }
    }
  }
  catch (e) {
    console.error('Error fetching image from localForage:', e)
  }
})
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
            <VisualizerMain
              :image="image"
              :mantel="mantels"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
            class="d-flex flex-column justify-center gap-y-3"
          >
            <h6 class="text-h4">
              {{ mantels.wall_shape.shapes.length }} {{ mantels.wall_shape.shapes.length < 2 ? "Mantel" : "Mantels" }}
            </h6>
            <p class="text-body-2">
              Please select a mantel to visualize.
            </p>
            <div>
              <VBtn
                variant="outlined"
                class="ma-1"
                @click="router.replace(route.query.to ? String(route.query.to) : '/visualizer/mantel/draw-mantel')"
              >
                Draw Mantel
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

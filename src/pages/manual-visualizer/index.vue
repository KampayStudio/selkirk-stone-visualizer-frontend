<script setup lang="ts">
import VisualizerMain from '@/layouts/components/visualizer/VisualizerMain.vue'
import localForage from 'localforage'

const route = useRoute()
const router = useRouter()
const image = ref()
const isDialogOpen = ref(false)

onMounted(async () => {
  try {
    const storedImage = await localForage.getItem('visualizeImage')

    if (storedImage) {
      try {
        image.value = JSON.parse(storedImage)
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

const toggleDialog = () => {
  isDialogOpen.value = !isDialogOpen.value
}
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
            <VisualizerMain :image="image" />
          </VCol>
          <VCol
            cols="12"
            md="4"
            class="d-flex flex-column justify-center gap-y-3"
          >
            <VBtn
              class="align-self-end"
              variant="outlined"
              @click="toggleDialog"
            >
              Get Help
            </VBtn>
            <div class="d-flex flex-column my-auto">
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
              <h6 class="text-h4">
                {{ image.wall_shape.shapes.length }} Detected Walls
              </h6>
              <p class="text-body-2">
                Are you satisfied with the wall detection? <br> Proceeding will not allow further changes.
              </p>
              <div class="d-flex gap-x-3">
                <VBtn
                  variant="outlined"
                  @click="router.replace(route.query.to ? String(route.query.to) : '/manual-visualizer/edit-wall')"
                >
                  Edit Wall
                </VBtn>
                <VBtn @click="router.replace(route.query.to ? String(route.query.to) : '/manual-visualizer/wall-selection')">
                  Proceed
                </VBtn>
              </div>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VDialog v-model="isDialogOpen">
      <VCard
        max-width="1255"
        min-width="300"
        class="mx-auto w-100"
      >
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">
            Get Help
          </div>

          <VBtn
            icon="mdi-close"
            variant="text"
            @click="toggleDialog"
          />
        </VCardTitle>
        <iframe
          width="1255"
          height="706"
          src="https://www.youtube.com/embed/BRnwSedEpG0"
          title="Stone Veneer | Selkirk Stone"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
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
</style>

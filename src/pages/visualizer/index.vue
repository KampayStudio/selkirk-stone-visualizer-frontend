<script setup lang="ts">
import VisualizerMain from '@/layouts/components/visualizer/VisualizerMain.vue'

const image = ref(JSON.parse(localStorage.getItem('visualizeImage')))
</script>

<template>
  <section>
    <VCard>
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VisualizerMain :image="image" />
          </VCol>
          <VCol
            cols="12"
            md="6"
            class="d-flex flex-column justify-center gap-y-3"
          >
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
                disabled
              >
                Edit Wall
              </VBtn>
              <VBtn>
                Proceed
              </VBtn>
            </div>
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

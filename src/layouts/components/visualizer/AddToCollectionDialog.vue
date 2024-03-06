<script setup lang="ts">
import localforage from 'localforage'
import SnackBar from '../SnackBar.vue'
import axiosIns from '@/plugins/axios'

const isShow = ref(false)
const SnackBarRef = ref(null)

const visualizeImage = ref()
const visualizerData = ref()

const loadingAdd = ref(false)

const form = ref({
  name: '',
  category: undefined,
})

const triggerShow = () => {
  isShow.value = !isShow.value
}

const addToCollection = async () => {
  loadingAdd.value = true

  const combineWallShapesAndDimensions = (wallShapes, wallDimensions) => {
    return wallShapes.map((shape, index) => ({
      coordinates: shape,
      details: wallDimensions[index],
    }))
  }

  const payload = {
    user_id: sessionStorage.getItem('id'),
    collection_name: form.value.name,
    category: form.value.category,
    walls_detected: visualizerData.value.dimensions.length,
    estimated_total_area: '500',
    image: visualizeImage.value.image,

    walls: combineWallShapesAndDimensions(visualizeImage.value.wall_shape.shapes, visualizerData.value.dimensions),
  }

  try {
    const response = await axiosIns.post('/visualizer/collections/', payload)

    console.log(response)
    SnackBarRef.value.show('success', response.statusText)
  }
  catch (e) {
    console.log(e)
    SnackBarRef.value.show('error', 'Please contact support')
  }

  loadingAdd.value = false
  isShow.value = false
}

onMounted(async () => {
  visualizeImage.value = JSON.parse(await localforage.getItem('visualizeImage'))
  visualizerData.value = JSON.parse(await localforage.getItem('visualizerData'))
})

defineExpose({ triggerShow })
</script>

<template>
  <div>
    <VDialog v-model="isShow">
      <VCard
        max-width="700"
        class="mx-auto"
        title="Add to Collection"
        style="min-inline-size: 340px"
      >
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="form.name"
                label="Name"
              />
            </VCol>
            <VCol cols="12">
              <VSelect
                v-model="form.category"
                label="Category"
                :items="['Interior', 'Exterior', 'Mantel']"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <div class="d-flex justify-end ms-auto">
            <VBtn
              variant="text"
              @click="triggerShow"
            >
              Cancel
            </VBtn>
            <VBtn
              variant="text"
              :loading="loadingAdd"
              @click="addToCollection"
            >
              Add
            </VBtn>
          </div>
        </VCardActions>
      </VCard>
    </VDialog>

    <SnackBar ref="SnackBarRef" />
  </div>
</template>

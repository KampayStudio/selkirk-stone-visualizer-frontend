<script setup lang="ts">
import Loading from '@/layouts/components/Loading.vue'
import SnackBar from '@/layouts/components/SnackBar.vue'
import axios from '@axios'

const LoadingRef = ref(null)
const selectedItem = ref([])

const SnackBarRef = ref(null)
const items = ['Interior', 'Exterior', 'Non-Combustible Mantle']

const interior = ref([])
const exterior = ref([])
const mantel = ref([])

const selectedItems = ref({
  interior: [],
  exterior: [],
  mantel: [],
})

const fetchCollection = async () => {
  LoadingRef.value.triggerDialog(true)
  try {
    const response = await axios.get(`/visualizer/collections/?user_id=${sessionStorage.getItem('id')}`)

    const dataWithSelected = response.data.map(item => ({
      ...item,
      selected: false,
    }))

    interior.value = dataWithSelected.filter(item => item.category.toLowerCase() === 'interior')
    exterior.value = dataWithSelected.filter(item => item.category.toLowerCase() === 'exterior')
    mantel.value = dataWithSelected.filter(item => item.category.toLowerCase() === 'mantel')

    // Automatically add category titles if items exist
    if (interior.value.length > 0)
      selectedItem.value.push('Interior')
    if (exterior.value.length > 0)
      selectedItem.value.push('Exterior')
    if (mantel.value.length > 0)
      selectedItem.value.push('Non-Combustible Mantle')
  }
  catch (e) {
    console.error(e)
  }
  finally {
    LoadingRef.value.triggerDialog(false)
  }
}

const toggleSelection = (item, category) => {
  const categoryItems = selectedItems.value[category]
  const itemIndex = categoryItems.findIndex(selectedItem => selectedItem.id === item.id)

  item.selected = !item.selected

  if (itemIndex === -1)
    categoryItems.push(item)

  else
    categoryItems.splice(itemIndex, 1)
}

const clearSelections = () => {
  ['interior', 'exterior', 'mantel'].forEach(category => {
    eval(category).value.forEach(item => item.selected = false)
  })
}

const deleteSelectedItems = async () => {
  LoadingRef.value.triggerDialog(true)
  try {
    for (const category of Object.keys(selectedItems.value)) {
      const selectedCategoryItems = eval(category).value.filter(item => item.selected)

      // Delete each selected item in the current category
      for (const item of selectedCategoryItems) {
        await axios.delete(`/visualizer/collections/${item.id}`)

        // Remove item from the front-end state
        const index = eval(category).value.findIndex(i => i.id === item.id)
        if (index !== -1)
          eval(category).value.splice(index, 1)
      }
    }

    // Clear selections after deletion
    fetchCollection()
    clearSelections()
    SnackBarRef.value.show('success', 'Selected items have been successfully deleted.')
  }
  catch (error) {
    console.error('Failed to delete selected items:', error)
    SnackBarRef.value.show('error', 'Error deleting selected items. Please try again.')
  }
  finally {
    LoadingRef.value.triggerDialog(false)
  }
  LoadingRef.value.triggerDialog(false)
}

onMounted(async () => {
  await fetchCollection()
  console.log(exterior.value)
})

const selectAll = category => {
  // Assuming 'interior', 'exterior', 'mantel' are the keys in both `selectedItems` and refs
  const categoryRef = { interior, exterior, mantel }[category]
  if (categoryRef) {
    // Determine if all items are currently selected
    const allSelected = categoryRef.value.every(item => item.selected)

    // If all items are selected, deselect them. Otherwise, select them.
    categoryRef.value.forEach(item => { item.selected = !allSelected })

    // Update the selectedItems state based on the new selection state
    selectedItems.value[category] = allSelected ? [] : [...categoryRef.value]
  }
}
</script>

<template>
  <section
    id="my-collection-section"
    class="max-section-width"
  >
    <VRow class="d-flex">
      <VCol>
        <h3 class="text-primary text-h4">
          My Collection
        </h3>
      </VCol>
      <VCol
        class="d-flex"
        style="justify-content: end;"
      >
        <div class="d-flex gap-x-2 my-auto">
          <VBtn
            size="small"
            to="/sample-scenes"
          >
            Try Sample Scenes
          </VBtn>
          <VBtn
            size="small"
            to="/manual-visualizer/upload"
          >
            Upload Photo
          </VBtn>
        </div>
      </VCol>
    </VRow>
    <div>
      <p>Added here are the generated images that you added to ‘Collection’</p>
    </div>
    <VCard>
      <VCardText>
        <VRow>
          <VCol class="d-flex gap-x-2">
            <!--
              <VBtn size="small">
              Generate Report
              </VBtn>
            -->
            <VBtn
              variant="text"
              size="small"
              @click="deleteSelectedItems"
            >
              Delete
            </VBtn>
            <VBtn
              variant="text"
              size="small"
              @click="clearSelections"
            >
              Clear
            </VBtn>
          </VCol>
          <VCol cols="3">
            <VCombobox
              v-model="selectedItem"
              :items="items"
              density="compact"
              label="Filter"
              multiple
            />
          </VCol>
        </VRow>
        <div v-if="selectedItem.includes('Interior')">
          <VCheckbox
            label="Interior"
            class="mt-4 mb-2"
            style=" display: flex; ;font-weight: bold;"
            @click="selectAll('interior')"
          />
          <VContainer fluid>
            <VRow
              class="d-flex"
              style="justify-content: center;"
            >
              <VCol
                v-for="i in interior"
                :key="i.id"
                class="text-center"
                cols="12"
                sm="6"
                md="3"
                lg="2"
              >
                <div
                  class="image-mask image-container"
                  @click="() => toggleSelection(i, 'interior')"
                >
                  <img :src="i.image">
                  <VCheckbox
                    v-model="i.selected"
                    class="checkbox"
                  />
                </div>
              </VCol>
            </VRow>
          </VContainer>
        </div>
        <div v-if="selectedItem.includes('Exterior')">
          <VCheckbox
            label="Exterior"
            class="mt-4 mb-2"
            style=" display: flex; ;font-weight: bold;"
            @click="selectAll('exterior')"
          />
          <VContainer fluid>
            <VRow
              class="d-flex"
              style="justify-content: center;"
            >
              <VCol
                v-for="i in exterior"
                :key="i.id"
                class="text-center"
                cols="12"
                sm="6"
                md="3"
                lg="2"
              >
                <div
                  class="image-mask image-container"
                  @click="() => toggleSelection(i, 'exterior')"
                >
                  <img :src="i.image">
                  <VCheckbox
                    v-model="i.selected"
                    class="checkbox"
                  />
                </div>
              </VCol>
            </VRow>
          </VContainer>
        </div>
        <div v-if="selectedItem.includes('Non-Combustible Mantle')">
          <VCheckbox
            label="Non-Combustible Mantle"
            class="mt-4 mb-2"
            style=" display: flex; ;font-weight: bold;"
            @click="selectAll('mantel')"
          />
          <VContainer fluid>
            <VRow
              class="d-flex"
              style="justify-content: center;"
            >
              <VCol
                v-for="i in mantel"
                :key="i.id"
                class="text-center"
                cols="12"
                sm="6"
                md="3"
                lg="2"
              >
                <div
                  class="image-mask image-container"
                  @click="() => toggleSelection(i, 'mantel')"
                >
                  <img :src="i.image">
                  <VCheckbox
                    v-model="i.selected"
                    class="checkbox"
                  />
                </div>
              </VCol>
            </VRow>
          </VContainer>
        </div>
      </VCardText>
    </VCard>

    <Loading ref="LoadingRef" />
    <SnackBar ref="SnackBarRef" />
  </section>
</template>

<style lang="scss">
.max-section-width {
  margin-inline: auto;
  max-inline-size: 1440px;
}

#my-collection-section{
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

.image-container{
  position: relative;

  .checkbox{
    position:absolute;
    color: white;
    inset-block-start: .2rem;
    inset-inline-end: .5rem;
  }
}
</style>

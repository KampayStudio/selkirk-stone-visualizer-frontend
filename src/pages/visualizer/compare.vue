<script setup lang="ts">
import localforage from 'localforage'
import LoginPrompt from '@/layouts/components/LoginPrompt.vue'
import AddToCollectionDialog from '@/layouts/components/visualizer/AddToCollectionDialog.vue'
import axiosIns from '@/plugins/axios'

const originalImage = ref()
const visualizedImage = ref()
const visualizerData = ref()
const wallCoordinates = ref()
const AddToCollectionDialogRef = ref()
const LoginPromptRef = ref(null)

const route = useRoute()
const router = useRouter()

const isUserLoggedIn = sessionStorage.getItem('id') !== null

onMounted(async () => {
  visualizerData.value = JSON.parse(await localforage.getItem('visualizerData'))

  originalImage.value = visualizerData.value.raw_image
  visualizedImage.value = JSON.parse(await localforage.getItem('visualizeImage')).image

  wallCoordinates.value = JSON.parse(await localforage.getItem('visualizeImage')).wall_shape
  await uploadToInfo()
})

const downloadimage = async () => {
  const a = document.createElement('a')
  const image = await localforage.getItem('visualizeImage')

  a.href = JSON.parse(image).image
  a.download = 'visualized_image.png'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const addToCollection = () => {
  if (isUserLoggedIn)
    AddToCollectionDialogRef.value.triggerShow()
  else
    LoginPromptRef.value.triggerDialog()
}

const viewCollection = () => {
  if (isUserLoggedIn)
    router.replace(route.query.to ? String(route.query.to) : '/collection')
  else
    LoginPromptRef.value.triggerDialog()
}

const uploadToInfo = async () => {
  const info = JSON.parse(localStorage.getItem('uploadedInfo'))

  // Convert base64 to Blob
  const base64Response = await fetch(visualizedImage.value)
  const blob = await base64Response.blob()

  // Create FormData and append the file
  const formData = new FormData()

  formData.append('edited_image', blob, 'image.png')

  const response = await axiosIns.put(`/viz-image/image/${info.id}/`, formData)

  console.log(response.data)
}
</script>

<template>
  <div class="max-vcard">
    <VCard>
      <VCardText class="text-center">
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <div class="text-h6">
              ORIGINAL IMAGE
            </div>

            <VImg :src="originalImage" />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <div class="text-h6">
              VISUALIZED IMAGE
            </div>

            <VImg :src="visualizedImage" />
          </VCol>
        </VRow>

        <VRow>
          <VCol class="d-flex align-center">
            <div class="d-block gap-x-3 d-lg-flex">
              <VBtn
                variant="outlined"
                density="compact"
                class="mt-2 mx-1"
                @click="addToCollection"
              >
                Add to collection
              </VBtn>
              <VBtn
                variant="outlined"
                density="compact"
                class="mt-2 mx-1"
                @click="downloadimage"
              >
                Download
              </VBtn>
              <VBtn
                variant="outlined"
                density="compact"
                disabled
                class="mt-2 mx-1"
              >
                Share
              </VBtn>
            </div>
          </VCol>
          <VCol>
            <div class="d-block gap-x-3 justify-end d-lg-flex">
              <RouterLink to="/sample-scenes">
                <VBtn
                  variant="outlined"
                  class="mt-2 mx-1"
                >
                  Try Another Photo
                </VBtn>
              </RouterLink>
              <VBtn
                class="mt-2 mx-1"
                @click="viewCollection"
              >
                View Collection
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
    <AddToCollectionDialog ref="AddToCollectionDialogRef" />

    <LoginPrompt ref="LoginPromptRef" />
  </div>
</template>

<style scoped lang="scss">
.max-vcard{
  margin-block-start: 2rem;
  margin-inline: auto;
  max-inline-size: 1440px
}

img{
  display: block;
  block-size: 100px;
  inline-size: 100px;
}
</style>

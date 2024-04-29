<script setup lang="ts">
import LoginPrompt from '@/layouts/components/LoginPrompt.vue'
import AddToCollectionDialog from '@/layouts/components/visualizer/AddToCollectionDialog.vue'
import axiosIns from '@/plugins/axios'

const AddToCollectionDialogRef = ref(null)
const LoginPromptRef = ref(null)
const originalImage = JSON.parse(sessionStorage.getItem('visualizeImage')).image
const processedImage = sessionStorage.getItem('processedImage')

function downloadImage(imageSrc: string, imageName: string) {
  const downloadLink = document.createElement('a')

  downloadLink.href = imageSrc
  downloadLink.download = imageName
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

const addToCollection = async () => {
  try {
    const response = await axiosIns.post('/visualizer/collections/', {
      image: processedImage,
      collection_name: 'NAME',
      category: sessionStorage.getItem('category'),
      stone: JSON.stringify(sessionStorage.getItem('processedData')),
    })

    console.log(response)
  }
  catch (e) {
    console.log(e)
  }
}

const shareImage = async () => {
  if (!navigator.share) {
    console.log('Web Share API not supported in this browser.')

    return
  }

  try {
    // Download the image from the URL
    const response = await fetch(processedImage)
    const blob = await response.blob()

    // Create a temporary URL for the downloaded image (optional)
    const temporaryURL = window.URL.createObjectURL(blob)

    // Share the image using the Web Share API
    await navigator.share({
      title: 'Visualized Image',
      text: 'Check out this image!',
      files: [blob], // Share the Blob object containing the image data
    })

    console.log('Image shared successfully!')

    // Revoke the temporary URL if created (optional)
    if (temporaryURL)
      window.URL.revokeObjectURL(temporaryURL)
  }
  catch (error) {
    console.error('Error sharing the image:', error)
  }
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
            <!-- ORIGINAL IMAGE -->
            <VImg :src="originalImage" />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <div class="text-h6">
              VISUALIZED IMAGE
            </div>
            <!-- Visualized Image -->
            <VImg :src="processedImage" />
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
                @click="downloadImage(processedImage, 'VisualizedImage.jpg')"
              >
                Download
              </VBtn>
              <VBtn
                variant="outlined"
                density="compact"
                class="mt-2 mx-1"
                @click="shareImage"
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
              <VBtn class="mt-2 mx-1">
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

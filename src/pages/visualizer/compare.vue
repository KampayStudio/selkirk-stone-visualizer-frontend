<script setup lang="ts">
import LoginPrompt from '@/layouts/components/LoginPrompt.vue'
import SnackBar from '@/layouts/components/SnackBar.vue'
import axiosIns from '@/plugins/axios'

const router = useRouter()
const LoginPromptRef = ref(null)
const originalImage = JSON.parse(sessionStorage.getItem('visualizeImage')).image
const processedImage = sessionStorage.getItem('processedImage')
const addToCollectionLoading = ref(false)
const SnackBarRef = ref()
const collectionName = ref('')
const isDialogOpen = ref(false)
const originalImageLoading = ref(true)
const visualizedImageLoading = ref(true)

const checkIfLogin = () => {
  if (sessionStorage.getItem('authToken'))
    return true
  else
    LoginPromptRef.value.triggerDialog()

  return false
}

function downloadImage(imageSrc: string, imageName: string) {
  if (!checkIfLogin())
    return

  const downloadLink = document.createElement('a')

  downloadLink.href = imageSrc
  downloadLink.download = imageName
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

const addToCollection = async () => {
  addToCollectionLoading.value = true
  if (!checkIfLogin())
    return
  try {
    const response = await axiosIns.post('/visualizer/collections/', {
      image: processedImage,
      user_id: sessionStorage.getItem('id'),
      collection_name: collectionName.value,
      category: sessionStorage.getItem('category'),
      stones: JSON.stringify(sessionStorage.getItem('processedData')),
    })

    console.log(response)
    isDialogOpen.value = false
    collectionName.value = ''
    SnackBarRef.value.show('success', 'Added to collection')
  }
  catch (e) {
    console.log(e.response.data)
    SnackBarRef.value.show('error', 'There is an error while adding to collection')
  }
  finally {
    addToCollectionLoading.value = false
  }
}

const shareImage = async () => {
  if (!checkIfLogin())
    return
  if (!navigator.share) {
    console.log('Web Share API not supported in this browser.')

    return
  }

  try {
    await navigator.share({
      title: 'Visualized Image',
      text: 'Check out this image!',
      url: processedImage,
    })
    console.log('Image shared successfully!')
  }
  catch (error) {
    console.error('Error sharing the image:', error)
  }
}

const viewCollection = () => {
  if (!checkIfLogin())
    return

  router.push('/collection')
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
            <div
              v-if="originalImageLoading"
              class="image-loader"
            >
              <VProgressCircular
                indeterminate
                color="primary"
              />
            </div>
            <VImg
              :src="originalImage"
              @load="originalImageLoading = false"
            />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <div class="text-h6">
              VISUALIZED IMAGE
            </div>
            <!-- Visualized Image -->
            <div
              v-if="visualizedImageLoading"
              class="image-loader"
            >
              <VProgressCircular
                indeterminate
                color="primary"
              />
            </div>
            <VImg
              :src="processedImage"
              @load="visualizedImageLoading = false"
            />
          </VCol>
        </VRow>

        <VRow>
          <VCol class="d-flex align-center">
            <div class="d-block gap-x-3 d-lg-flex">
              <VBtn
                variant="outlined"
                density="compact"
                class="mt-2 mx-1"

                @click="isDialogOpen = !isDialogOpen"
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

    <LoginPrompt ref="LoginPromptRef" />
    <SnackBar ref="SnackBarRef" />
    <VDialog v-model="isDialogOpen">
      <VCard
        class="mx-auto"
        title="Add to Collection"
        style="min-inline-size: 15rem;"
      >
        <VCardText>
          <VRow>
            <VCol>
              <VTextField
                v-model="collectionName"
                label="Collection Name"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <VBtn @click="isDialogOpen = !isDialogOpen">
            Cancel
          </VBtn>
          <VSpacer />
          <VBtn
            :disabled="collectionName.length === 0"
            :loading="addToCollectionLoading"
            @click="addToCollection"
          >
            Add
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
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

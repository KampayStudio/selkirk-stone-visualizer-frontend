<script setup lang="ts">
import localforage from 'localforage'

const originalImage = ref()
const visualizedImage = ref()

onMounted(async () => {
  originalImage.value = JSON.parse(await localforage.getItem('visualizerData')).raw_image
  visualizedImage.value = JSON.parse(await localforage.getItem('visualizeImage')).image

  console.log(visualizedImage)
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
            <div class="d-flex gap-x-3">
              <VBtn
                variant="outlined"
                density="compact"
                disabled
              >
                Add to collection
              </VBtn>
              <VBtn
                variant="outlined"
                density="compact"
                @click="downloadimage"
              >
                Download
              </VBtn>
              <VBtn
                variant="outlined"
                density="compact"
                disabled
              >
                Share
              </VBtn>
            </div>
          </VCol>
          <VCol>
            <div class="d-flex gap-x-3 justify-end">
              <RouterLink to="/sample-scenes">
                <VBtn variant="outlined">
                  Try Another Photo
                </VBtn>
              </RouterLink>

              <VBtn disabled>
                View Collection
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
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

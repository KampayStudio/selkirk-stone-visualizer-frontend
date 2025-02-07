<script setup lang="ts">
import { default as axios, default as axiosIns } from '@axios'
import localForage from 'localforage'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

const fileInput = ref(null)
const fileInputFile = ref(null)
const fileInputUrl = ref(null)
const fileInputEmail = ref(null)
const fileInputEmailValid = ref(false)
const selectionGroup = ref('exterior')
const isImageSelected = ref(false)
const isLoadingOpen = ref(false)

// Assuming convertImageToBase64 and other helper functions are already defined

const apiConfig = {
  interior: {
    url: 'https://detect.roboflow.com/kp-ss-indoor-wall-segmentation/1',
  },
  exterior: {
    url: 'https://detect.roboflow.com/kp-ss-outdoor-wall-segmentation/1',
  },

  // Placeholder for future implementations
  mantle: { url: null },
}

const uploadImage = async selectedFile => {
  const reader = new FileReader()

  reader.onload = async e => {
    const selectionConfig = apiConfig[selectionGroup.value]
    const imageBase64 = e.target.result.split(',')[1]

    if (selectionGroup.value === 'mantle') {
      router.push('/manual-visualizer/mantel')

      return
    }

    if (!selectionConfig || !selectionConfig.url) {
      console.log(`${selectionGroup.value} is not yet available`)

      return
    }

    isLoadingOpen.value = true

    try {
      const response = await axios({
        method: 'POST',
        url: selectionConfig.url,
        params: { api_key: 'XVVN1vofu0gxVx4Ez6IC' },
        data: imageBase64,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })

      // Assuming convertResponseToDesiredFormat modifies the response format suitably for goToVisualizer
      const formattedResponse = convertResponseToDesiredFormat(response.data, e.target.result)

      await goToVisualizer(formattedResponse)
    }
    catch (error) {
      console.error(error.message)
    }
    finally {
      isLoadingOpen.value = false
    }
  }

  reader.readAsDataURL(selectedFile)
}

const goToVisualizer = async sampleImage => {
  try {
    // Assuming sampleImage.image already contains the base64 string
    const toVisualize = { ...sampleImage }

    localForage.setItem('visualizeImage', JSON.stringify(toVisualize))
    console.log(toVisualize.wall_shape.shapes.length)

    const visualizerData = {
      dimensions: [],
      raw_image: undefined,
      current_wall_number: 0,
    }

    for (let i = 0; i < toVisualize.wall_shape.shapes.length; i++) {
      visualizerData.dimensions.push({
        area: 0,
        height: 0,
        width: 0,
        stone_type: '',
        stone_color: '',
      })
    }

    visualizerData.raw_image = toVisualize.image
    visualizerData.current_wall_number = 0

    localForage.setItem('visualizerData', JSON.stringify(visualizerData))

    router.replace(route.query.to ? String(route.query.to) : '/manual-visualizer')
  }
  catch (error) {
    console.error('Error in goToVisualizer:', error)
  }
}

const convertResponseToDesiredFormat = (originalResponse, base64image) => {
  const predictions = originalResponse.predictions

  const newFormat = {
    image: base64image, // Set the image path as required
    wall_shape: {
      shapes: [],
    },
  }

  predictions.forEach(prediction => {
    const shape = prediction.points.map(point => {
      return { x: Math.round(point.x), y: Math.round(point.y) }
    })

    newFormat.wall_shape.shapes.push(shape)
  })

  return newFormat
}

const uploadToServer = async () => {
  isLoadingOpen.value = true
  isImageSelected.value = false

  const formData = new FormData()

  formData.append('raw_image', fileInputFile.value)
  formData.append('uploaded_by', fileInputEmail.value)

  try {
    // Using axios for the POST request
    const response = await axiosIns.post('/viz-image/upload/raw_image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    localStorage.setItem('uploadedInfo', JSON.stringify(response.data))

    sessionStorage.setItem('visualizeImage', JSON.stringify({ image: response.data.raw_image }))
    sessionStorage.setItem('category', selectionGroup.value)

    await uploadImage(fileInputFile.value)
  }
  catch (error) {
    alert('Failed to upload photo')
    console.error('Failed to upload file:', error)
    throw error // Rethrow to allow the calling function to handle it
  }
  finally {
    isLoadingOpen.value = false
  }
}

const onFileChange = event => {
  if (event.target.files.length > 0) {
    fileInputFile.value = event.target.files[0]
    fileInputUrl.value = URL.createObjectURL(fileInputFile.value)

    isImageSelected.value = true
  }
}

const openFileDialog = () => {
  fileInput.value.click()
}

const validateEmail = () => {
  if (!fileInputEmail.value)
    return fileInputEmailValid.value = false
  else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fileInputEmail.value))
    return fileInputEmailValid.value = true
  else
    return fileInputEmailValid.value = false
}
</script>

<template>
  <section class="max-section-width">
    <VRow>
      <VCol
        cols="12"
        md="6"
        class="d-flex flex-column gap-y-2"
      >
        <h3 class="text-h3 text-primary">
          Upload Photo
          <VChip
            id="beta-chip"
            color="primary"
            variant="flat"
            label
          >
            BETA
          </VChip>
        </h3>
        <p class="text-body-2">
          Upload your own project image and our A.I. technology (Beta version) will process the wall detection and can enable you to visualize our range of high-quality manufactured stone and brick veneers. Please be advised that we are still improving this feature and the wall detection of your project might not be perfect.
        </p>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VBtn
          variant="outlined"
          :to="{ name: 'sample-scenes' }"
        >
          Try Sample Scene
        </VBtn>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <div>
          <p class="text-body-2 text-secondary">
            Select the type of your project:
          </p>
          <VRadioGroup
            v-model="selectionGroup"
            inline
          >
            <VRadio
              key="exterior"
              label="Exterior"
              value="exterior"
            />
            <VRadio
              key="interior"
              label="Interior"
              value="interior"
            />
            <VRadio
              key="mantle"
              label="Non-Combustible Mantel"
              value="mantle"
            />
          </VRadioGroup>
        </div>
      </VCol>
    </VRow>
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <div
          class="drag-drop-area"
          @dragover.prevent="onDragOver"
          @drop.prevent="onFileDrop"
          @click="openFileDialog"
        >
          <input
            ref="fileInput"
            type="file"
            class="d-none"
            accept="image/*"
            @change="onFileChange"
          >
          <VIcon class="upload-icon">
            mdi-cloud-upload
          </VIcon>
          <span>Drag & Drop or Browse</span>
        </div>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <p class="text-body-2">
          To achieve optimal outcomes, please adhere to these guidelines for your image:
        </p>
        <ol>
          <li class="text-body-2">
            -Ensure a minimum width of 1600px and a landscape orientation.
          </li>
          <li class="text-body-2">
            -Keep the file size within 16MB.
          </li>
          <li class="text-body-2">
            -Capture the subject clearly without any obstructions.
          </li>
          <li class="text-body-2">
            -Provide a high-quality image free from any blurriness or distortions.
          </li>
        </ol>
      </VCol>
    </VRow>

    <VDialog v-model="isImageSelected">
      <VCard
        max-width="400"
        style="align-self: center;"
      >
        <VCardTitle>
          Upload Photo
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="612">
              <img
                :src="fileInputUrl"
                style="block-size: 200px; inline-size: auto;"
              >
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="fileInputEmail"
                label="Enter your email"
                type="email"
                required
                @input="validateEmail"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="default"
            variant="flat"
            @click="isImageSelected = false"
          >
            Cancel
          </VBtn>
          <VBtn
            :disabled="!fileInputEmailValid"
            variant="flat"
            @click="uploadToServer"
          >
            Upload
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VDialog
      v-model="isLoadingOpen"
      persistent
    >
      <VCard
        max-width="500"
        min-width="300"
        class="mx-auto w-100"
      >
        <VCardText class="d-flex justify-space-center flex-column align-center text-center mt-3">
          <div class="loader" />
          <h6 class="text-h6 mt-3">
            Image Uploading...
          </h6>
          <p class="body-text-2">
            Your uploaded image is being processed with our technology. Please be advised that we are still improving this feature and the wall detection of your project might not be perfect.
          </p>
        </VCardText>
      </VCard>
    </VDialog>
  </section>
</template>

<style lang="scss" scoped>
.max-section-width {
  margin-inline: auto;
  max-inline-size: 1440px;
}

section{
  padding: 2rem;
}

.drag-drop-area {
  padding: 40px;
  border: 2px dashed #E0E0E0;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.3s;
}

.drag-drop-area:hover {
  border-color: #9E9E9E;
}

.upload-icon {
  color: #9E9E9E;
  font-size: 48px;
}

.loader{
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  block-size:2rem;
  border-block-start: 6px solid rgb(41,77,32);
  inline-size:2rem
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% {transform: rotate(360deg) }
}
</style>

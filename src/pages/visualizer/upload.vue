<script setup lang="ts">
import { ref } from 'vue'
import axios from '@axios'

const route = useRoute()
const router = useRouter()

const fileInput = ref(null)
const selectionGroup = ref('interior')

const uploadImage = async selectedFile => {
  const reader = new FileReader()

  reader.onload = async e => {
    const imageBase64 = e.target.result.split(',')[1]

    try {
      if (selectionGroup.value === 'interior') {
        const response = await axios({
          method: 'POST',
          url: 'https://detect.roboflow.com/kp-ss-indoor-wall-segmentation/1',
          params: {
            api_key: 'XVVN1vofu0gxVx4Ez6IC',
          },
          data: imageBase64,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })

        localStorage.setItem('visualizeImage', JSON.stringify(convertResponseToDesiredFormat(response.data, e.target.result)))
        router.replace(route.query.to ? String(route.query.to) : '/visualizer')
      }
      else if (selectionGroup.value === 'exterior') {
        const response = await axios({
          method: 'POST',
          url: 'https://detect.roboflow.com/kp-ss-outdoor-wall-segmentation/1',
          params: {
            api_key: 'XVVN1vofu0gxVx4Ez6IC',
          },
          data: imageBase64,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })

        localStorage.setItem('visualizeImage', JSON.stringify(convertResponseToDesiredFormat(response.data, e.target.result)))
        router.replace(route.query.to ? String(route.query.to) : '/visualizer')
      }
      else if (selectionGroup.value === 'mantle') {
        console.log('not yet available')
      }
    }
    catch (error) {
      console.error(error.message)
    }
  }

  reader.readAsDataURL(selectedFile)
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

const onFileChange = event => {
  if (event.target.files.length > 0) {
    const selectedFile = event.target.files[0]

    uploadImage(selectedFile)
  }
}

const openFileDialog = () => {
  fileInput.value.click()
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
        </h3>
        <p class="text-body-2">
          Upload your own project image and our advanced A.I. technology will  process it, enabling you to visualize our range of high-quality manufactured stone and brick veneers
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
              key="interior"
              label="Interior"
              value="interior"
            />
            <VRadio
              key="exterior"
              label="Exterior"
              value="exterior"
            />
            <VRadio
              key="mantle"
              label="Non-Combustible Mantle"
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
  </section>
</template>

<style lang="scss">
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
</style>

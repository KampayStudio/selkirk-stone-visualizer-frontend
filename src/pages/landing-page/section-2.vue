<script setup lang="ts">
import axios from '@axios'

const section_content = ref({
  banner_1: '',
  banner_2: '',
  banner_3: '',
  heading_1: '',
  photo_caption_1: '',
  photo_caption_2: '',
  photo_caption_3: '',
  body: '',
})

const get_content = async () => {
  try {
    const response = await axios.get('/contents/section2/')

    section_content.value = response.data[0]
  }
  catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  get_content()
})
</script>

<template>
  <section
    v-if="section_content.body"
    id="section-2"
    style=" padding: 50px;"
  >
    <div class="text-center d-flex flex-column gap-y-3">
      <h3
        class="text-3xl text-primary"
        style="color:#3E3E3E"
      >
        {{ section_content.heading_1 }}
      </h3>
      <h4 style="color: #7E7E7E;">
        {{ section_content.body }}
      </h4>
      <VRow class="d-flex mx-auto">
        <VCol
          cols="12"
          md="4"
        >
          <div class="index-image-mask">
            <RouterLink :to="{ name: 'sample-scenes' }">
              <img
                :src="section_content.banner_1"
                style=" max-block-size: 20rem;min-block-size: 20rem;"
              >
            </RouterLink>
          </div>
          <p>{{ section_content.photo_caption_1 }}</p>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <div class="index-image-mask">
            <RouterLink :to="{ name: 'sample-scenes' }">
              <img
                :src="section_content.banner_2"
                style=" max-block-size: 20rem;min-block-size: 20rem;"
              >
            </RouterLink>
          </div>

          <p>{{ section_content.photo_caption_2 }}</p>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <div class="index-image-mask">
            <RouterLink :to="{ name: 'sample-scenes' }">
              <img
                :src="section_content.banner_3"
                style=" max-block-size: 20rem;min-block-size: 20rem;"
              >
            </RouterLink>
          </div>
          <p>{{ section_content.photo_caption_3 }}</p>
        </VCol>
      </VRow>
    </div>
  </section>
</template>

<style lang="scss">
#section-2{
  img{
    border-radius:10px;
  }

  @media (max-width: 975px) {
    padding-block-start: 3rem;
    text-align: center
  }
}

.index-image-mask {
  display: flex; /* Added to ensure proper alignment */
  overflow: hidden;
  align-items: center; /* Center images vertically */
  justify-content: center; /* Center images horizontally */
  border-radius:10px;
  max-block-size: 20rem;
  max-inline-size: 15rem;
}
</style>

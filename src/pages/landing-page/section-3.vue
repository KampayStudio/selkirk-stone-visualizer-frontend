<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import axios from '@axios'

const section_content = ref({
  banner_photo_1: '',
  banner_photo_2: '',
  banner_photo_3: '',
  banner_photo_4: '',
  banner_photo_5: '',
  banner_photo_6: '',
  heading_1: '',
  heading_2: '',
  body: '',
})

const get_content = async () => {
  try {
    const response = await axios.get('/contents/section3/')

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
    id="section-3"
    class="index-max-section-width"
  >
    <div
      class="index-max-content-width d-flex"
      style="block-size: 100%"
    >
      <VRow class="my-auto">
        <VCol
          cols="12"
          md="5"
          class="my-auto"
        >
          <div
            style="margin-inline-start: auto;"
            class="d-flex gap-y-6 flex-column"
          >
            <h1 class="text-5xl text-primary">
              {{ section_content.heading_1 }}
            </h1>
            <p>
              {{ section_content.body }}
            </p>
            <div>
              <VBtn class="primary">
                Explore More
              </VBtn>
            </div>
          </div>
        </VCol>
        <VCol
          md="7"
          cols="12"
          style="padding: 3rem"
        >
          <Carousel :items-to-show="1">
            <Slide key="0">
              <VImg
                :src="section_content.banner_photo_1"
                class="carousel-image"
              />
            </Slide>
            <Slide key="1">
              <VImg
                :src="section_content.banner_photo_1"
                class="carousel-image"
              />
            </Slide>
            <Slide key="2">
              <VImg
                :src="section_content.banner_photo_2"
                class="carousel-image"
              />
            </Slide>
            <Slide key="3">
              <VImg
                :src="section_content.banner_photo_3"
                class="carousel-image"
              />
            </Slide>
            <Slide key="4">
              <VImg
                :src="section_content.banner_photo_4"
                class="carousel-image"
              />
            </Slide>
            <Slide key="5">
              <VImg
                :src="section_content.banner_photo_5"
                class="carousel-image"
              />
            </Slide>
            <Slide key="6">
              <VImg
                :src="section_content.banner_photo_6"
                class="carousel-image"
              />
            </Slide>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </VCol>
      </VRow>
    </div>
  </section>
</template>

<style lang="scss">
.index-max-section-width {
  margin-inline: auto;
  max-inline-size: 135rem;
}

.index-max-content-width {
  box-sizing: border-box; // Ensures padding is included in the width calculation
  inline-size: 100%; // Container takes full width of the viewport
  max-inline-size: 100vw; // Max width is 100% of the viewport width

  @media (min-width: 1440px) {
    padding-inline: calc((100vw - 1440px) / 2);
  }
}

#section-3{
  background-color: #FFFDF3;

  img{
    border-radius:10px;
  }

  @media (max-width: 975px) {
    padding-block-start: 3rem;
    text-align: center;

    #column-2 {
      padding: 2rem;
    }
  }
}

.carousel-image{
max-block-size: 30rem;
}
</style>

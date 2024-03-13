<script setup>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import axios from '@axios'
import 'vue3-carousel/dist/carousel.css'

const section_content = ref({
  heading_1: '',
  heading_2: '',
  body: '',
})

const banners = ref([])

const get_content = async () => {
  try {
    const response = await axios.get('/contents/section3/')

    section_content.value = response.data[0]
    banners.value = response.data[0].banner_photos
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
  <div>
    <!-- Skeleton Loading -->
    <section
      v-if="!section_content.body"
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
                <PuSkeleton />
              </h1>
              <p>
                <PuSkeleton />
              </p>
              <div>
                <PuSkeleton height="2rem" />
              </div>
            </div>
          </VCol>
          <VCol
            md="7"
            cols="12"
            style="padding: 3rem"
          >
            <PuSkeleton height="20rem" />
          </VCol>
        </VRow>
      </div>
    </section>
    <section
      v-if="section_content.body"
      class="content"
    >
      <div class="content-text">
        <h1 class="text-5xl text-primary mb-5">
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
      <div>
        <Carousel
          v-if="banners"
          :items-to-show="1"
          class="carousel"
        >
          <Slide
            v-for="(banner, index) in banners"
            :key="index"
          >
            <div class="carousel-image-container">
              <img :src="banner.photo">
            </div>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.content {
  // d-flex justify-center align-center
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 960px) {
    flex-direction: column;
  }

}

.content-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-inline-size: 30rem;

  @media (max-width: 960px) {
    align-items: center;
    text-align: center;
  }
}

.carousel{
  max-inline-size: 40rem;

  @media  (max-width: 60rem) {
    padding-block-start:3rem;
  }
}

.carousel-image-container{
  display: flex;
  overflow: hidden;
  justify-content: center;
  border-radius: 15px;
  block-size: 30rem;
  inline-size: 22rem;

  img{
    inline-size: auto;
  }
}
</style>

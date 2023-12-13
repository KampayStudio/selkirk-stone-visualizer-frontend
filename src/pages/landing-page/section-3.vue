<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
</script>

<template>
  <section
    id="section-3"
    class="max-section-width"
  >
    <div
      class="max-content-width d-flex"
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
              Design <br> Inspirations
            </h1>
            <p>
              Our designer already made a lot of beautiful prototipe of rooms that inspire you.
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
                src="/image/section2card1.png"
                class="carousel-image"
              />
            </Slide>
            <Slide key="1">
              <VImg
                src="/image/section2card2.png"
                class="carousel-image"
              />
            </Slide>
            <Slide key="2">
              <VImg
                src="/image/section2card3.png"
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
.max-section-width {
  margin-inline: auto;
  max-inline-size: 135rem;
}

.max-content-width {
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

<script setup lang="ts">
import axios from '@axios'

const section_content = ref({
  photo_1: '',
  heading_1: '',
  heading_2: '',
  body: '',
})

const get_content = async () => {
  try {
    const response = await axios.get('/contents/section4/')

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
    id="section-4"
    class="max-section-width"
  >
    <VRow class="max-content-width">
      <VCol
        id="col-1"
        md="6"
        cols="12"
        class="d-flex"
        style="justify-content: flex-end;"
      >
        <img :src="section_content.photo_1">
      </VCol>
      <VCol
        id="col-2"
        md="6"
        cols="12"
        style="max-inline-size:30rem;"
        class="d-flex"
      >
        <div class="my-auto d-flex gap-y-3 flex-column">
          <h1 class="text-4xl mb-2 text-primary">
            {{ section_content.heading_1 }}
          </h1>
          <p class="text-primary">
            {{ section_content.body }}
          </p>
        </div>
      </VCol>
    </VRow>
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

#section-4{
  #col-1{
    padding-block-start: 3rem;
  }

  @media (max-width: 975px) {
    #col-1{
      display:none!important;
    }

    #col-2{
      margin-inline:auto;
      padding-block-start: 5rem;
      padding-inline: 2rem;
      text-align: center;
    }
  }
}
</style>

<script setup lang="ts">
import axios from '@axios'

const section_content = ref({
  photo_1: '',
  heading_1: '',
  body: '',
})

const pageLoading = ref(true)

const get_content = async () => {
  try {
    const response = await axios.get('/contents/section4/')

    section_content.value = response.data[0]
    pageLoading.value = false
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
    <section
      v-if="pageLoading"
      class="section4"
    >
      <VRow class="content">
        <VCol
          id="col-1"
          md="6"
          cols="12"
          class="d-flex"
          style="justify-content: flex-end;"
        >
          <PuSkeleton height="10rem" />
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
              <PuSkeleton />
            </h1>
            <p class="text-primary">
              <PuSkeleton />
            </p>
          </div>
        </VCol>
      </VRow>
    </section>
    <section
      v-if="!pageLoading"
      id="section4"
    >
      <VRow class="content">
        <VCol
          id="col-1"
          md="4"
          cols="12"
          class="d-none d-md-flex"
          style="justify-content: flex-end;"
        >
          <img :src="section_content.photo_1">
        </VCol>
        <VCol
          id="col-2"
          md="8"
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
  </div>
</template>

<style lang="scss">
#section4 {
  color: white;

  .content {
    margin-inline: auto;
    max-inline-size: 1440px;
    padding-block-start: 3rem;

    @media (max-width: 960px) {
      #col-2{
        margin-inline:auto;
        text-align: center;
      }

      padding-block: 3rem;
      padding-inline: 1.2rem;

    }
  }
}
</style>

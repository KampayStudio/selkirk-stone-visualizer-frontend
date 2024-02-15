<script setup lang="ts">
import axios from '@axios'

const section_content = ref({
  logo: '',
  website: '',
  contact1: '',
  contact2: '',
  address: '',
  subtitle: '',
})

const pageLoading = ref(true)

const get_content = async () => {
  try {
    const response = await axios.get('/contents/footer/')

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
      id="section5"
    >
      <div class="content">
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <p class="text-sm">
              <PuSkeleton />
            </p>
            <p class="text-sm">
              <PuSkeleton />
            </p>

            <p class="text-sm">
              <PuSkeleton /> <br>
              <PuSkeleton /> <br>

              <PuSkeleton />
            </p>
          </VCol>
          <VCol
            class="d-flex flex-column justify-content-center"
            cols="12"
            md="6"
          >
            <div>
              <p class="text-sm">
                <PuSkeleton />
              </p>
              <div class="gap-x-1">
                <PuSkeleton height="2rem" />
                <PuSkeleton height="2rem" />
              </div>
            </div>
          </VCol>
        </VRow>
        <hr
          id="footer-credits"
          class="text-white mb-1 "
        >
        <div>
          <VRow>
            <VCol class="text-xs">
              <PuSkeleton />
            </VCol>
            <VCol
              class="text-xs"
              style="justify-content: flex-end;"
            >
              <PuSkeleton />
            </VCol>
          </VRow>
        </div>
      </div>
    </section>
    <section
      v-if="!pageLoading"
      id="section5"
    >
      <VRow
        style="max-inline-size: 1280px;"
        class="d-flex align-center mx-auto pt-5"
      >
        <VCol
          cols="12"
          md="6"
        >
          <img :src="section_content.logo">
          <p class="text-sm">
            {{ section_content.website }}
          </p>

          <p class="text-sm">
            {{ section_content.contact1 }} <br>
            {{ section_content.contact2 }} <br><br>

            {{ section_content.address }} <br>
            Edmonton: 10711 181 Street NW
          </p>
        </VCol>
        <VCol
          class="d-flex flex-column justify-content-center"
          cols="12"
          md="6"
        >
          <div>
            <p>{{ section_content.subtitle }}</p>
            <div class="d-flex gap-x-1">
              <input
                type="text"
                style=" padding:1rem; background-color: white; block-size: 2.5rem;color: #7C7C7C; inline-size: 100%;max-inline-size: 20rem;"
                class="rounded text-sm"
                placeholder="Enter your email"
              >
              <button
                style=" padding:.69rem;background-color: #1A4E19;"
                class="text-sm rounded"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </VCol>
      </VRow>
      <hr
        id="footer-credits"
        class="text-white mb-1 "
      >
      <div class="content">
        <VRow>
          <VCol class="text-xs">
            © Selkirk Stone 2023
          </VCol>
          <VCol
            class="d-flex text-xs"
            style="justify-content: flex-end;"
          >
            Website Design and Development © Kampay Studio 2023
          </VCol>
        </VRow>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
#section5{
  background-color: #5F2726;
  color:white;
}

.content{
  margin-inline:auto;
  max-inline-size: 1255px;
}
</style>

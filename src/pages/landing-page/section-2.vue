<script setup lang="ts">
import axios from '@axios'

const route = useRoute()
const router = useRouter()

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
  <div>
    <!-- Skeleton Loading -->
    <section
      v-if="!section_content.body"
      id="section-2"
      style=" padding: 50px;"
    >
      <div class="text-center d-flex flex-column gap-y-3">
        <h3
          class="text-3xl text-primary"
          style="color:#3E3E3E"
        >
          <PuSkeleton />
        </h3>
        <h4 style="color: #7E7E7E;">
          <PuSkeleton />
        </h4>
        <VRow>
          <VCol
            v-for="i in 3"
            :key="i"
          >
            <PuSkeleton height="20rem" />
          </VCol>
        </VRow>
      </div>
    </section>
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
        <h4
          style="color: #7E7E7E; max-inline-size: 800px;"
          class="mx-auto mb-3"
        >
          {{ section_content.body }}
        </h4>
        <VRow class="d-flex mx-auto">
          <VCol
            cols="12"
            md="4"
          >
            <div class="index-image-mask">
              <img
                :src="section_content.banner_1"
                style=" max-block-size: 20rem;min-block-size: 20rem;"
                @click="router.replace(route.query.to ? String(route.query.to) : '/sample-scenes?section=exterior')"
              >
            </div>
            <p class="mt-3">
              {{ section_content.photo_caption_1 }}
            </p>
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <div class="index-image-mask">
              <img
                :src="section_content.banner_2"
                style=" max-block-size: 20rem;min-block-size: 20rem;"
                @click="router.replace(route.query.to ? String(route.query.to) : '/sample-scenes?section=interior')"
              >
            </div>

            <p class="mt-3">
              {{ section_content.photo_caption_2 }}
            </p>
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <div class="index-image-mask">
              <img
                :src="section_content.banner_3"
                style=" max-block-size: 20rem;min-block-size: 20rem;"
                @click="router.replace(route.query.to ? String(route.query.to) : '/sample-scenes?section=mantle')"
              >
            </div>
            <p class="mt-3">
              {{ section_content.photo_caption_3 }}
            </p>
          </VCol>
        </VRow>
      </div>
    </section>
  </div>
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
  margin-inline: auto;
  max-block-size: 20rem;
  max-inline-size: 15rem;
}
</style>

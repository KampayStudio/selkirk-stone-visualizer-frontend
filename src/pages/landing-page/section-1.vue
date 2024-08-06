<script setup lang="ts">
import axios from '@axios'

const section_content = ref({
  banner: '',
  heading_1: '',
  heading_2: '',
  body: '',
})

const get_content = async () => {
  try {
    const response = await axios.get('/contents/section1/')

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
    <section
      v-if="!section_content.body"
      id="section1"
      class="index-max-section-width index-max-content-width"
    >
      <div style="inline-size: 1380px;">
        <VCard id="section-1-card">
          <VCardText
            class="d-flex gap-y-3"
            style="flex-direction: column;"
          >
            <h1 class="text-primary text-5xl">
              <PuSkeleton />
            </h1>
            <h3 class="text-secondary">
              <PuSkeleton />
            </h3>
            <p class="text-p">
              <PuSkeleton />
            </p>
          </VCardText>
        </VCard>
      </div>
    </section>
    <section
      v-if="section_content.body"
      id="section1"
      class="index-max-section-width index-max-content-width"
      :style="{ backgroundImage: `url(${section_content.banner})` }"
    >
      <div style="inline-size: 1380px;">
        <VCard id="section-1-card">
          <VCardText
            class="d-flex gap-y-3"
            style="flex-direction: column;"
          >
            <h1 class="text-primary text-5xl">
              {{ section_content.heading_1 }}
            </h1>
            <h3 class="text-secondary">
              {{ section_content.heading_2 }}
            </h3>
            <p class="text-p">
              {{ section_content.body }}
            </p>
            <div
              id="section-1-buttons"
              class="d-flex gap-x-5"
            >
              <VBtn
                id="section-1-first-button"
                :to="{ name: 'sample-scenes' }"
              >
                Try Sample Scenes
              </VBtn>
              <VBtn
                variant="outlined"
                :to="{ name: 'manual-visualizer-upload' }"
              >
                Upload a photo
                <VBadge
                  id="beta-badge"
                  content="BETA"
                />
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </div>
    </section>
    <section id="dummy" />
  </div>
</template>

<style lang="scss">
#beta-badge {
  position: absolute;
  inset-block-start: calc(50% - 2px);
  inset-inline-end: 0;
}

#beta-badge .v-badge__badge {
  border-radius: 4px;
}

#dummy{
  display:none;

  @media (max-width: 975px) {
    position:static;
    display: block;
    block-size: 40rem;
  }
}

#section1 {
  display: flex;
  justify-content: center;
  background-color: white;

  // background-image: url('/image/landing-page-house.jpeg');
  background-position: center;
  background-size: cover;
  block-size: 50rem;
  padding-block-start: 4rem;

  @media (max-width: 975px) {
    position:absolute;
    block-size: 45rem;
    inline-size: 100vw;
    inset-block-start: 0;
    padding-block-start: 8rem;
  }

  @media (max-width: 1440px){
    padding-inline: 2rem;
  }

}

#section-1-card{
  padding: 1rem;
  max-inline-size: 35rem;

  @media (max-width: 975px) {
    position: static;
    padding: .5rem;
    margin: auto;
    max-inline-size: 25rem;

    h1{
      font-size: 2rem;
    }

    button {
      block-size: 3rem;
      font-size: .8rem;
    }

    #section-1-buttons{
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
    }
  }

}
</style>

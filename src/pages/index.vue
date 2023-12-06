<script setup lang="ts">

// router.replace(route.query.to ? String(route.query.to) : '/login')
const route = useRoute()
const router = useRouter()

if (localStorage.getItem('loggedIn') === '0') {
  console.log('hello')
  router.replace(route.query.to ? String(route.query.to) : '/login')
}
</script>

<template>
  <!-- 1st Section -->
  <section
    id="section1"
    style=" position: relative; background-image: url('/selkirk-stone-visualizer-frontend/image/landing-page-house.png'); background-size:cover; block-size: 50rem; inline-size: 100%"
  >
    <VCard style="position: absolute; background-color: #F4F2E9; inset-block-end: 15rem; inset-inline-end: 40px;max-inline-size: 30rem;">
      <VCardText
        class="d-flex gap-y-3"
        style="flex-direction: column; padding: 2rem;"
      >
        <h1 class="text-primary text-5xl">
          See Your Project<br> Come to Life!
        </h1>
        <h3 class="text-secondary">
          Introducing Our Visualizer App!
        </h3>
        <h5>
          Begin by selecting from our sample scenes or uploading your own project image.
          Our advanced A.I. technology will then process it, enabling you to visualize our
          range of high-quality manufactured stone and brick veneers tailored to your specifications.
        </h5>
        <div class="d-flex gap-x-5">
          <VBtn>Try Sample Scenes</VBtn>
          <VBtn variant="outlined">
            Upload a photo
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </section>
  <!-- 2nd Section -->
  <section style=" padding: 50px;">
    <div class="text-center d-flex flex-column gap-y-3">
      <h3
        class="text-3xl"
        style="color:#3E3E3E"
      >
        Browse The Range
      </h3>
      <h4 style="color: #7E7E7E;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h4>
      <div class="d-flex mx-auto gap-x-5">
        <div>
          <img
            src="/image/section2card1.png"
            style=" max-block-size: 20rem;min-block-size: 20rem;"
          >
          <p>Interior</p>
        </div>
        <div>
          <img
            src="/image/section2card2.png"
            style=" max-block-size: 20rem;min-block-size: 20rem;"
          >
          <p>Exterior</p>
        </div>
        <div>
          <img
            src="/image/section2card3.png"
            style=" max-block-size: 20rem;min-block-size: 20rem;"
          >
          <p>Fireplace</p>
        </div>
      </div>
    </div>
  </section>
  <!-- 3rd Section -->
  <!--
    <section style=" background-color: #FFFDF3;block-size: 25rem;">
    3rd section
    </section>
  -->
  <!-- 4th section -->
  <section style="padding-block-start: 5rem; padding-inline-end: 5rem; padding-inline-start: 5rem;">
    <VRow>
      <VCol style=" padding: .35rem;padding-inline-start: 10rem;">
        <img
          src="/image/hand-mockup_1.png"
          style="block-size: 25rem;"
        >
      </VCol>
      <VCol style="padding-inline-end: 10rem;">
        <h1 class="text-3xl mb-5">
          FAQs and Tips
        </h1>
        <p>
          Begin by selecting from our sample scenes or uploading your own project image.
          Our advanced A.I. technology will then process it, enabling you to visualize our
        </p>
        <p style=" padding:0;margin: 0">
          range of high-quality manufactured stone and brick veneers tailored to your specifications.
          Begin by selecting from our sample scenes or uploading your own project image. Our advanced A.I. technology will then process it.
        </p>
      </VCol>
    </VRow>
  </section>
  <!-- Footer -->
  <section style=" background-color: #5F2726;color:white; padding-block: 2rem; padding-inline: 15rem;">
    <div>
      <VRow>
        <VCol>
          <img src="/image/selkirk-logo-white.png">
          <p class="text-sm">
            www.selkirkstone.com
          </p>

          <p class="text-sm">
            Office (587) 352-8046 <br>
            Mobile (403) 975-3707 <br>

            5308 4th Street SECalgary, <br>
            Alberta T2H 1K5
          </p>
        </VCol>
        <VCol class="d-flex flex-column justify-content-center">
          <div>
            <p>Stay updated from us!</p>
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
      <hr class="text-white mb-1">
      <div>
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
    </div>
  </section>
</template>

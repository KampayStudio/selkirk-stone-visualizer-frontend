<template>
  <section
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
        <img src="/image/hand-mockup_1.png">
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
            FAQs and Tips
          </h1>
          <p class="text-primary">
            Begin by selecting from our sample scenes or uploading your own project image. Our advanced A.I.
            technology will then process it, enabling you to visualize our range of high-quality manufactured
            stone and brick veneers tailored to your specifications.
          </p>
          <p class="text-primary">
            Begin by selecting from our sample scenes or uploading your own project image. Our advanced A.I. technology will then process it.
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

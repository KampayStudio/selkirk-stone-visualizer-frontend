<template>
  <section
    id="section1"
    class="index-max-section-width index-max-content-width"
  >
    <VCard id="section-1-card">
      <VCardText
        class="d-flex gap-y-3"
        style="flex-direction: column;"
      >
        <h1 class="text-primary text-5xl">
          See Your Project<br> Come to Life!
        </h1>
        <h3 class="text-secondary">
          Introducing Our Visualizer App!
        </h3>
        <p class="text-p">
          Begin by selecting from our sample scenes or uploading your own project image.
          Our advanced A.I. technology will then process it, enabling you to visualize our
          range of high-quality manufactured stone and brick veneers tailored to your specifications.
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
            :to="{ name: 'visualizer-upload' }"
          >
            Upload a photo
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </section>
  <section id="dummy" />
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

#dummy{
  display:none;

  @media (max-width: 975px) {
    position:static;
    display: block;
    block-size: 40rem;
  }
}

#section1 {
  background-color: white;
  background-image: url('/image/landing-page-house.jpeg');
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

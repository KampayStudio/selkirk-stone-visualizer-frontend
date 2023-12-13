<template>
  <section
    id="section-2"
    style=" padding: 50px;"
  >
    <div class="text-center d-flex flex-column gap-y-3">
      <h3
        class="text-3xl text-primary"
        style="color:#3E3E3E"
      >
        Browse The Range
      </h3>
      <h4 style="color: #7E7E7E;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h4>
      <VRow class="d-flex mx-auto">
        <VCol
          cols="12"
          md="4"
        >
          <div class="image-mask">
            <img
              src="/image/section2card1.jpeg"
              style=" max-block-size: 20rem;min-block-size: 20rem;"
            >
          </div>
          <p>Interior</p>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <div class="image-mask">
            <img
              src="/image/section2card2.jpeg"
              style=" max-block-size: 20rem;min-block-size: 20rem;"
            >
          </div>
          <p>Exterior</p>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <div class="image-mask">
            <img
              src="/image/section2card3.jpeg"
              style=" max-block-size: 20rem;min-block-size: 20rem;"
            >
          </div>
          <p>Fireplace</p>
        </VCol>
      </VRow>
    </div>
  </section>
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

.image-mask {
  overflow: hidden;
  max-block-size: 20rem;
  max-inline-size: 15rem;
}

.image-mask img {
  block-size: auto; /* This ensures the image scales proportionally */
  inline-size: 100%;
}
</style>

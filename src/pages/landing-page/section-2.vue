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
        For quality and consistency, Selkirk Stone is there for you.
      </h4>
      <VRow class="d-flex mx-auto">
        <VCol
          cols="12"
          md="4"
        >
          <div class="index-image-mask">
            <RouterLink :to="{ name: 'sample-scenes' }">
              <img
                src="/image/section2card1.jpeg"
                style=" max-block-size: 20rem;min-block-size: 20rem;"
              >
            </RouterLink>
          </div>
          <p>Interior</p>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <div class="index-image-mask">
            <RouterLink :to="{ name: 'sample-scenes' }">
              <img
                src="/image/section2card2.jpeg"
                style=" max-block-size: 20rem;min-block-size: 20rem;"
              >
            </RouterLink>
          </div>

          <p>Exterior</p>
        </VCol>
        <VCol
          cols="12"
          md="4"
        >
          <div class="index-image-mask">
            <RouterLink :to="{ name: 'sample-scenes' }">
              <img
                src="/image/section2card3.jpeg"
                style=" max-block-size: 20rem;min-block-size: 20rem;"
              >
            </RouterLink>
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

.index-image-mask {
  display: flex; /* Added to ensure proper alignment */
  overflow: hidden;
  align-items: center; /* Center images vertically */
  justify-content: center; /* Center images horizontally */
  border-radius:10px;
  max-block-size: 20rem;
  max-inline-size: 15rem;
}
</style>

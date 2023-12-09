<template>
  <section
    id="section-5"
    style=" background-color: #5F2726;color:white;"

    class="max-section-width"
  >
    <div class="max-content-width">
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
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
        <VCol
          class="d-flex flex-column justify-content-center"
          cols="12"
          md="6"
        >
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
      <hr
        id="footer-credits"
        class="text-white mb-1 "
      >
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

#section-5{
  padding-block:3rem;

  @media (max-width: 975px) {
    padding: 3rem;
    margin-block-start: 4rem;

    #footer-credits{
      margin-block-start:2rem;
    }
  }
}
</style>

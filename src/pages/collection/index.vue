<template>
  <section
    id="my-collection-section"
    class="max-content-width"
  >
    <div class="d-flex justify-space-between">
      <h3 class="text-primary text-h4">
        My Collection
      </h3>
      <div class="d-flex gap-x-2 my-auto">
        <VBtn size="small">
          Try Sample Scenes
        </VBtn>
        <VBtn size="small">
          Upload Photo
        </VBtn>
      </div>
    </div>
    <div>
      <p>Added here are the generated images that you add to ‘Collection’</p>
    </div>
    <VCard>
      <VCardText>
        <VRow>
          <VCol class="d-flex gap-x-2">
            <VBtn size="small">
              Generate Report
            </VBtn>
            <VBtn
              variant="text"
              size="small"
            >
              Delete
            </VBtn>
          </VCol>
        </VRow>

        <VCheckbox
          label="Interior"
          class="mt-4 mb-2"
          style="font-weight: bold;"
        />
        <VRow style="padding-inline: 1rem">
          <VCol
            v-for="i in 10"
            :key="i"
            cols="3"
          >
            <div class="image-mask image-container">
              <img src="/image/section2card2.png">
              <VCheckbox class="checkbox" />
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </section>
</template>

<style lang="scss">
.max-content-width {
  box-sizing: border-box; // Ensures padding is included in the width calculation
  inline-size: 100%; // Container takes full width of the viewport
  max-inline-size: 100vw; // Max width is 100% of the viewport width

  @media (min-width: 1440px) {
    padding-inline: calc((100vw - 1440px) / 2);
  }
}

#my-collection-section{
  padding: 2rem;
}

.image-mask {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  block-size: 8rem;
  inline-size: 12rem;

  img {
    block-size: auto;
    inline-size: 100%;
  }
}

.image-container{
  position: relative;

  .checkbox{
    position:absolute;
    color: white;
    inset-block-start: .2rem;
    inset-inline-end: .5rem;
  }
}
</style>

<template>
  <section class="max-section-width">
    <VCard>
      <VCardItem>
        <VRow>
          <VCol class="d-flex align-center gap-x-5">
            <div>
              <VImg
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg"
                style="border-radius: 10px; inline-size: 9.375rem;"
              />
            </div>
            <div class="d-flex gap-y-2 flex-column">
              <div class="d-flex gap-x-2">
                <VBtn>Upload</VBtn>
                <VBtn variant="outlined">
                  Reset
                </VBtn>
              </div>
              <div>
                <p class="text-body-2">
                  Allowed JPG, GIF or PNG. Max size of 800K
                </p>
              </div>
            </div>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <h6 class="text-h6">
              Personal Information
            </h6>
          </VCol>
        </VRow>

        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField label="First Name" />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField label="Last Name" />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField label="Email" />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField label="Contact Number" />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField label="Address" />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField label="Zip Code" />
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <h6 class="text-h6">
              Account Security
            </h6>
          </VCol>
        </VRow>

        <VRow>
          <VCol class="d-flex gap-x-2">
            <VBtn variant="outlined">
              Change Password
            </VBtn>
            <VBtn variant="outlined">
              Delete Account
            </VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol class="d-flex justify-end gap-x-2">
            <VBtn variant="outlined">
              Cancel
            </VBtn>
            <VBtn>Save Changes</VBtn>
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
  </section>
</template>

<style lang="scss">
.max-section-width {
  margin: 1rem;
  margin-inline: auto;
  max-inline-size: 1440px;;
}
</style>

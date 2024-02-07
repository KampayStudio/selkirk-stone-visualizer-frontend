<script setup lang="ts">
import ChangePasswordModal from '@/layouts/components/profile/ChangePasswordModal.vue'
import DeleteAccountConfirmation from '@/layouts/components/profile/DeleteAccountConfirmation.vue'
import axios from '@axios'

const profile = ref({
  profile_picture: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg',
  id: '',
  first_name: sessionStorage.getItem('first_name'),
  last_name: sessionStorage.getItem('last_name'),
  email: sessionStorage.getItem('email'),
  contact_number: sessionStorage.getItem('contact_number'),
  address: sessionStorage.getItem('address'),
})

const saveChanges = async () => {
  try {
    const response = await axios.patch(`/users/get-users/${sessionStorage.getItem('id')}/`, profile.value)

    console.log(response.data)
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <section class="max-section-width">
    <VCard>
      <VCardItem>
        <VRow>
          <VCol class="d-flex align-center gap-x-5">
            <div>
              <VImg
                :src="profile.profile_picture"
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
            <VTextField
              v-model="profile.first_name"
              label="First Name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="profile.last_name"
              label="Last Name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="profile.email"
              label="Email"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="profile.contact_number"
              label="Contact Number"
            />
          </VCol>
          <VCol cols="12">
            <VTextarea
              v-model="profile.address"
              label="Address"
            />
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
            <ChangePasswordModal />

            <DeleteAccountConfirmation />
          </VCol>
        </VRow>
        <VRow>
          <VCol class="d-flex justify-end gap-x-2">
            <VBtn @click="saveChanges">
              Save Changes
            </VBtn>
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

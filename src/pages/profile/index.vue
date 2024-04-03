<script setup lang="ts">
import DeleteAccountConfirmation from '@/layouts/components/profile/DeleteAccountConfirmation.vue'
import SnackBar from '@/layouts/components/SnackBar.vue'
import { default as axios, default as axiosIns } from '@axios'

const loading = ref()
const SnackBarRef = ref()
const delay = ms => new Promise(res => setTimeout(res, ms))
const ResetPasswordDialogRef = ref()
const resetPasswordLoading = ref()

const profile = ref({
  first_name: sessionStorage.getItem('first_name'),
  last_name: sessionStorage.getItem('last_name'),
  email: sessionStorage.getItem('email'),
  contact_number: sessionStorage.getItem('contact_number'),
  address: sessionStorage.getItem('address'),
})

const saveChanges = async () => {
  loading.value = true
  try {
    const response = await axios.patch(`/users/get-users/${sessionStorage.getItem('id')}/`, {
      first_name: profile.value.first_name,
      last_name: profile.value.last_name,
      email: profile.value.email,
      contact_number: profile.value.contact_number,
      address: profile.value.address,
    })

    console.log(response.data)
    SnackBarRef.value.show('success', response.data.message)
    await delay(2000)
    location.reload()
  }
  catch (error) {
    console.log(error)
    SnackBarRef.value.show('error', error.response.data.message)
  }
  finally {
    loading.value = false
  }
}

const fetchData = async () => {
  try {
    const response = await axiosIns.get(`/users/get-users/${sessionStorage.getItem('id')}`)

    profile.value = response.data
    sessionStorage.setItem('last_name', profile.value.last_name)
    sessionStorage.setItem('address', profile.value.address)
    sessionStorage.setItem('contact_number', profile.value.contact_number)
    sessionStorage.setItem('first_name', profile.value.first_name)
    sessionStorage.setItem('email', profile.value.email)
  }
  catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  fetchData()
})

const submit = async () => {
  resetPasswordLoading.value = true

  try {
    const response = await axiosIns.post('/users/reset-password/', {
      email: sessionStorage.getItem('email'),
    })

    SnackBarRef.value.show('success', response.data.message)
  }
  catch (e) {
    error.value = e.response.data.message
    console.log(e.response.data)
  }

  resetPasswordLoading.value = false
}
</script>

<template>
  <section class="max-section-width">
    <VCard>
      <VCardItem>
        <!--
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
        -->
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
            <!-- <ChangePasswordModal /> -->
            <VBtn
              variant="outlined"
              :loading="resetPasswordLoading"
              @click="submit"
            >
              Send Reset Password
            </VBtn>

            <DeleteAccountConfirmation />
          </VCol>
        </VRow>
        <VRow>
          <VCol class="d-flex justify-end gap-x-2">
            <VBtn
              :loading="loading"
              variant="outlined"
              @click="saveChanges"
            >
              Save Changes
            </VBtn>
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
    <SnackBar ref="SnackBarRef" />
    <ResetPasswordDialog ref="ResetPasswordDialogRef" />
  </section>
</template>

<style lang="scss">
.max-section-width {
  margin: 1rem;
  margin-inline: auto;
  max-inline-size: 1440px;;
}
</style>

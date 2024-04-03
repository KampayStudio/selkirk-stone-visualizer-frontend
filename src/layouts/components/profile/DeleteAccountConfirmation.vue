<script setup lang="ts">
import SnackBar from '../SnackBar.vue'
import axios from '@axios'

const isDialogOpen = ref(false)
const router = useRouter()
const SnackBarRef = ref()
const delay = ms => new Promise(res => setTimeout(res, ms))

const deleteAccount = async () => {
  try {
    const response = await axios.delete(`/users/get-users/${sessionStorage.getItem('id')}/`)

    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('first_name')
    sessionStorage.removeItem('last_name')
    sessionStorage.removeItem('address')
    sessionStorage.removeItem('contact_number')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('id')
    SnackBarRef.value.show('success', response.data.message)
    await delay(3000)
    router.push('/')
  }
  catch (error) {
    console.log(error)
    SnackBarRef.value.show('error', error.response.data.message)
  }
  isDialogOpen.value = false
}
</script>

<template>
  <div>
    <VBtn
      variant="outlined"
      @click="isDialogOpen = true"
    >
      Delete Account
    </VBtn>

    <ConfirmDialog
      :is-dialog-visible="isDialogOpen"
      confirmation-question="Are you sure you want to delete your account? This action cannot be undone."
      confirm-msg="You'll be logged out in a sec."
      confirm-title="Your account is deleted."
      @confirm="deleteAccount"
      @update:is-dialog-visible="() => {
        isDialogOpen = false
      }"
    />

    <SnackBar ref="SnackBarRef" />
  </div>
</template>

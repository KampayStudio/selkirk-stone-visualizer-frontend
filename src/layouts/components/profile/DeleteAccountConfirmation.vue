<script setup lang="ts">
import axios from '@axios'

const isDialogOpen = ref(false)

const deleteAccount = async () => {
  try {
    await axios.delete(`/users/get-users/${sessionStorage.getItem('id')}/`)

    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('first_name')
    sessionStorage.removeItem('last_name')
    sessionStorage.removeItem('address')
    sessionStorage.removeItem('contact_number')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('id')
    router.push('/login')
  }
  catch (error) {
    console.log(error)
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
    />
  </div>
</template>

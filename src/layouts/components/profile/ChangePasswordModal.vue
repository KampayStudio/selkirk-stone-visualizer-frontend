<script setup lang="ts">
import SnackBar from '../SnackBar.vue'
import axios from '@axios'
import { confirmedValidator, passwordValidator, requiredValidator } from '@validators'

const isDialogOpen = ref(false)
const isLoading = ref(false)

const password = ref()
const confirm_password = ref()
const isPasswordVisible = ref(false)
const isConfPasswordVisible = ref(false)
const SnackBarRef = ref()

const changePassword = async () => {
  isLoading.value = true
  try {
    if (password.value === confirm_password.value) {
      const response = await axios.post(`/users/change-password/${sessionStorage.getItem('id')}/`, {
        password: password.value,
      })

      console.log(response)
      SnackBarRef.value.show('success', response.data.message)
    }
    else {
      // eslint-disable-next-line no-alert
      alert('Please check your password')
    }
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <VBtn
      variant="outlined"
      @click="isDialogOpen = !isDialogOpen"
    >
      Change Password
    </VBtn>
    <SnackBar ref="SnackBarRef" />
    <VDialog v-model="isDialogOpen">
      <VCard
        width="500"
        class="mx-auto"
        title="Change Password"
      >
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                :rules="[requiredValidator, passwordValidator]"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>
            <VCol>
              <VTextField
                v-model="confirm_password"
                label="Confirm Password"
                :type="isConfPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isConfPasswordVisible ? 'bx-hide' : 'bx-show'"
                :rules="[requiredValidator, confirmedValidator(confirm_password, password)]"
                @click:append-inner="isConfPasswordVisible = !isConfPasswordVisible"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions
          class="d-flex justify-end"
          style="padding-inline-end: 1.2rem"
        >
          <VBtn
            variant="outlined"
            @click="isDialogOpen = false"
          >
            Cancel
          </VBtn>
          <VBtn
            variant="outlined"
            :loading="isLoading"
            @click="changePassword"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

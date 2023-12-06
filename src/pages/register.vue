<script setup lang="ts">
import Swal from 'sweetalert2'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const route = useRoute()
const router = useRouter()

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirm_password: '',
  contactNo: '',
  address: '',
  privacyPolicies: false,
})

const isPasswordVisible = ref(false)

function signup() {
  function isFormValid() {
    const { firstname, lastname, email, password, confirm_password, contactNo, address, privacyPolicies } = form.value

    if (firstname.length <= 1) {
      showAlert('Error!', 'First name must be longer than 1 character')

      return false
    }

    if (lastname.length <= 3) {
      showAlert('Error!', 'Last name must be longer than 3 characters')

      return false
    }

    if (email.length <= 3) {
      showAlert('Error!', 'Email must be longer than 3 characters')

      return false
    }

    if (password.length <= 5) {
      showAlert('Error!', 'Password must be longer than 5 characters')

      return false
    }

    if (confirm_password.length <= 8) {
      showAlert('Error!', 'Confirm password must be longer than 8 characters')

      return false
    }

    if (contactNo.length <= 10) {
      showAlert('Error!', 'Contact number must be longer than 10 characters')

      return false
    }

    if (address.length <= 5) {
      showAlert('Error!', 'Address must be longer than 5 characters')

      return false
    }

    if (!privacyPolicies) {
      showAlert('Unable to Sign up!', 'You must accept the Terms and Condition')

      return false
    }

    return true
  }

  function showAlert(title, text) {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonColor: '#1A4E19',
    })
  }

  if (isFormValid()) {
    Swal.fire({
      title: 'Successfully Signed Up!',
      icon: 'success',
      confirmButtonColor: '#1A4E19',
      confirmButtonText: 'Login Now',
    }).then(result => {
      if (result.isConfirmed)
        router.replace(route.query.to ? String(route.query.to) : '/login')
    })
  }

  // router.replace(route.query.to ? String(route.query.to) : '/login')
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      md="4"
      class="d-none d-md-flex"
    >
      <!-- illustration -->
      <div class="position-relative w-100">
        <div
          id="backdrop"
          class="d-flex align-center justify-center"
          style=" background-size: cover; block-size: 100vh;"
        >
          <!-- <VImg :src="backdrop" /> -->
        </div>
      </div>
    </VCol>

    <VCol
      cols="12"
      md="8"
      class="auth-card-v2 d-flex align-center justify-center"
      style="background-color: rgb(var(--v-theme-surface));"
    >
      <VCard
        flat
        :max-width="900"
        class="mt-12 mt-sm-0 pa-6"
        style="inline-size: 800px;"
      >
        <VCardItem class="justify-start">
          <template #prepend>
            <RouterLink to="/">
              <div class="d-flex">
                <VNodeRenderer :nodes="themeConfig.app.logo" />
              </div>
            </RouterLink>
          </template>

          <VCardTitle class="auth-title">
            {{ themeConfig.app.title }}
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <h6 class="text-h4 mb-1">
            Get Started
          </h6>
          <p class="mb-0">
            <span>Already have an account?</span>
            <RouterLink
              class="text-primary ms-2"
              :to="{ name: 'login' }"
            >
              Sign in
            </RouterLink>
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="signup">
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.email"
                      type="email"
                      autofocus
                      label="Email"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.contactNo"
                      autofocus
                      label="Contact Number"
                      required
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.firstname"
                      autofocus
                      label="First Name"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.lastname"
                      autofocus
                      label="Last Name"
                      required
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model="form.address"
                      autofocus
                      label="Address"
                      required
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.password"
                      label="Password"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.confirm_password"
                      label="Confirm Password"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </VCol>
                </VRow>

                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="form.privacyPolicies"
                    inline
                  />
                  <VLabel
                    for="privacy-policy"
                    style="opacity: 1;"
                  >
                    <span class="mx-2 text-wrap">I agree to
                      <RouterLink
                        class="text-primary"
                        :to="{ name: 'terms-and-condition' }"
                      >
                        TERMS AND CONDITIONS
                      </RouterLink>
                    </span>
                  </VLabel>
                </div>
                <VRow class="d-flex justify-content-end">
                  <VCol
                    cols="12"
                    md="2"
                    class="ms-auto"
                  >
                    <VBtn type="submit">
                      Sign up
                    </VBtn>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";

#backdrop{
  background-image: url('https://images.pexels.com/photos/7031403/pexels-photo-7031403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>

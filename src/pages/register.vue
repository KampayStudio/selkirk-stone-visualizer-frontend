<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import axios from '@axios'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { confirmedValidator, emailValidator, lengthValidator, passwordValidator, requiredValidator } from '@validators'

const route = useRoute()
const router = useRouter()

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirm_password: '',
  contact_number: '',
  address: '',
  privacyPolicies: false,
})

// const form = ref({
//   firstname: '',
//   lastname: '',
//   email: '',
//   password: '',
//   confirm_password: '',
//   contact_number: '',
//   address: '',
// })

const isPasswordVisible = ref(false)

async function signup() {
  try {
    const response = await axios.post('/users/register/',
      {
        first_name: form.value.firstname,
        last_name: form.value.lastname,
        email: form.value.email,
        password: form.value.password,
        contact_number: form.value.contact_number,
        address: form.value.address,
        is_admin: false,
        permissions: {
          is_administrator: false,
          is_content_managing: false,
          is_support: false,
          is_analytics: false,
          is_product_managing: false,
        },
      })

    console.log(response.data)
    router.replace(route.query.to ? String(route.query.to) : '/login')
  }
  catch (error) {
    console.error('Signup error:', error)
  }
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
                      :rules="[requiredValidator, emailValidator]"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.contact_number"
                      autofocus
                      label="Contact Number"
                      required
                      :rules="[requiredValidator, lengthValidator(form.contact_number, 8)]"
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
                      :rules="[requiredValidator, lengthValidator(form.contact_number, 2)]"
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
                      :rules="[requiredValidator, lengthValidator(form.contact_number, 2)]"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model="form.address"
                      autofocus
                      label="Address"
                      :rules="[requiredValidator, lengthValidator(form.contact_number, 8)]"
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
                      :rules="[requiredValidator, passwordValidator]"
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
                      :rules="[requiredValidator, confirmedValidator(form.confirm_password, form.password)]"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </VCol>
                </VRow>

                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="form.privacyPolicies"
                    inline
                    :rules="[requiredValidator]"
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

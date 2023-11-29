<script setup lang="ts">
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

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
      >
        <VCardItem class="justify-start">
          <template #prepend>
            <div class="d-flex">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
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
            Make your app management easy and fun!
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <VRow>
                  <VCol cols="6">
                    <VTextField
                      v-model="form.email"
                      type="email"
                      autofocus
                      label="Email"
                    />
                  </VCol>
                  <VCol cols="6">
                    <VTextField
                      v-model="form.contactNo"
                      autofocus
                      label="Contact Number"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="6">
                    <VTextField
                      v-model="form.firstname"
                      autofocus
                      label="First Name"
                    />
                  </VCol>
                  <VCol cols="6">
                    <VTextField
                      v-model="form.lastname"
                      autofocus
                      label="Last Name"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model="form.address"
                      autofocus
                      label="Address"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="6">
                    <VTextField
                      v-model="form.password"
                      label="Password"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </VCol>
                  <VCol cols="6">
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
                      <a
                        href="javascript:void(0)"
                        class="text-primary"
                      >privacy policy & terms</a>
                    </span>
                  </VLabel>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  Sign up
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="d-flex justify-center flex-column flex-sm-row flex-md-column flex-lg-row text-center text-base"
              >
                <span>Already have an account?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'login' }"
                >
                  Sign in instead
                </RouterLink>
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

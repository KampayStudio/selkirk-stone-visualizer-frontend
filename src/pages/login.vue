<script setup lang="ts">
import Swal from 'sweetalert2'
import background from '@images/pages/login-background.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const route = useRoute()
const router = useRouter()

const form = ref({
  userid: '',
  password: '',
  remember: false,
})

function login() {
  if (form.value.password.length > 8 && form.value.userid.length > 8) {
    router.replace(route.query.to ? String(route.query.to) : '/')
  }
  else {
    // Show an error message using Swal (SweetAlert)
    Swal.fire({
      title: 'Error!',
      text: 'Complete the login form',
      icon: 'error',
      confirmButtonColor: '#1A4E19',
    })
  }
}
const isPasswordVisible = ref(false)
</script>

<template>
  <VRow
    class="auth-wrapper"
    style="
      max-inline-size: 300rem;
    "
  >
    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
      style="background-color: rgb(var(--v-theme-surface));"
    >
      <VCard
        flat
        :max-width="800"
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
            Welcome
          </h6>
          <p class="mb-0">
            Sign in your account
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="login">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.userid"
                  autofocus
                  label="Email"
                  type="text"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  required
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox
                    v-model="form.remember"
                    label="Remember me"
                  />
                  <RouterLink
                    class="text-primary ms-2"
                    :to="{ name: 'forgot-password' }"
                  >
                    Forgot Password?
                  </RouterLink>
                </div>
                <VRow>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <VBtn
                      block
                      type="submit"
                    >
                      Login
                    </VBtn>
                  </VCol>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <VBtn
                      block
                      class="mb-1"
                      variant="outlined"
                      :to="{ name: 'register' }"
                    >
                      Signup
                    </VBtn>
                  </VCol>
                </VRow>
              </VCol>
              <!--
                <VCol
                cols="12"
                class="d-flex align-center"
                >
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
                </VCol>
              -->

              <!-- auth providers -->
              <!--
                <VCol
                cols="12"
                class="text-center"
                >
                <AuthProvider />
                </VCol>
              -->
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      md="8"
      class="d-none d-md-flex"
    >
      <!-- illustration -->
      <div class="position-relative w-100">
        <div
          class="d-flex align-center justify-center w-100"
          style="max-block-size: 100vh; object-fit: cover;"
        >
          <VImg :src="background" />
        </div>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";

.layout-navbar .layout-footer{
  display: none;
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>

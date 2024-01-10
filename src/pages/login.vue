<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import axios from '@axios'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { emailValidator, requiredValidator } from '@validators'

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)

const form = ref({
  userid: '',
  password: '',
  remember: false,
})

const login = async () => {
  isLoading.value = true
  try {
    const response = await axios.post('/users/login/', {
      email: form.value.userid,
      password: form.value.password,
    }, {
      withCredentials: true, // Include this line
    })

    localStorage.setItem('authToken', response.data.jwt)
    localStorage.setItem('first_name', response.data.first_name)
    localStorage.setItem('last_name', response.data.last_name)
    localStorage.setItem('address', response.data.address)
    localStorage.setItem('contact_number', response.data.contact_number)
    localStorage.setItem('email', response.data.email)
    isLoading.value = false
    router.replace(route.query.to ? String(route.query.to) : '/')
  }
  catch (error) {
    console.error('Login error:', error)
    isLoading.value = false
  }
}

const isPasswordVisible = ref(false)

const section_content = ref({
  logo: '',
  banner: '',
  heading_1: '',
  heading_2: '',
  body: '',
})

const get_content = async () => {
  try {
    const response = await axios.get('/contents/login_page/')

    section_content.value = response.data[0]
  }
  catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  get_content()
})
</script>

<template>
  <VRow
    v-if="section_content.body"
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
            {{ section_content.heading_1 }}
          </h6>
          <p class="mb-0">
            {{ section_content.body }}
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
                  :rules="[requiredValidator, emailValidator]"
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
                  :rules="[requiredValidator]"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
                <!-- :rules="[requiredValidator, passwordValidator]" -->
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
                      type="submit"
                      block
                    >
                      <div v-show="!isLoading">
                        Login
                      </div>
                      <VProgressCircular
                        v-show="isLoading"
                        indeterminate
                        color="white"
                      />
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
          <VImg :src="section_content.banner" />
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

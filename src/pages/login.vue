<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import axios from '@axios'
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

    sessionStorage.setItem('authToken', response.data.jwt)
    sessionStorage.setItem('first_name', response.data.first_name)
    sessionStorage.setItem('last_name', response.data.last_name)
    sessionStorage.setItem('address', response.data.address)
    sessionStorage.setItem('contact_number', response.data.contact_number)
    sessionStorage.setItem('email', response.data.email)
    sessionStorage.setItem('id', response.data.id)

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
    const response = await axios.get('/contents/login-page/')

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
  <div>
    <VRow v-if="!section_content.body">
      <VCol
        cols="12"
        md="4"
        class="auth-card-v2 d-flex align-center justify-center"
        style="background-color: rgb(var(--v-theme-surface));"
      >
        <VCard
          flat
          class="mt-12 mt-sm-0 pa-6"
        >
          <VCardItem class="justify-start">
            <PuSkeleton
              width="200px"
              height="2rem"
            />

            <VCardTitle class="auth-title">
              <PuSkeleton />
            </VCardTitle>
          </VCardItem>

          <VCardText>
            <h6 class="text-h4 mb-1">
              <PuSkeleton />
            </h6>
            <p class="mb-0">
              <PuSkeleton />
            </p>
          </VCardText>

          <VCardText>
            <VForm @submit.prevent="login">
              <VRow>
                <!-- email -->
                <VCol cols="12">
                  <PuSkeleton height="2rem" />
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <PuSkeleton height="2rem" />
                  <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                    <PuSkeleton width="150px" />
                    <PuSkeleton width="150px" />
                  </div>
                  <VRow>
                    <VCol
                      cols="12"
                      md="4"
                    >
                      <PuSkeleton height="2rem" />
                    </VCol>
                    <VCol

                      cols="12"
                      md="4"
                    >
                      <PuSkeleton height="2rem" />
                    </VCol>
                  </VRow>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        md="8"
        class="px-0"
      >
        <PuSkeleton height="100vh" />
      </VCol>
    </VRow>
    <VRow
      v-if="section_content.body"
      style="block-size: 101vh;"
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
                  <img
                    :src="section_content.logo"
                    alt="logo"
                    style="max-inline-size: 9rem;"
                  >
                </div>
              </RouterLink>
            </template>
          </VCardItem>

          <VCardText>
            <h6 class="text-h4 mb-1">
              {{ section_content.heading_1 }}
            </h6>
            <p class="mb-0">
              {{ section_content.heading_2 }}
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
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        md="8"
        class="d-none d-md-flex pa-0"
        :style="`background-image: url('${section_content.banner}'); background-position: center; background-size: cover;`"
      />
    </VRow>
  </div>
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

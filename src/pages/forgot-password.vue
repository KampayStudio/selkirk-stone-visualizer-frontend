<script setup lang="ts">
import axiosIns from '@/plugins/axios'
import authV1BottomShape from '@images/svg/bottom-illustration.svg?raw'
import authV1TopShape from '@images/svg/top-illustration.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = ref({
  email: '',
})

const submit = async () => {
  loading.value = true

  try {
    const response = await axiosIns.post('/users/reset-password/', {
      email: form.value.email,
    })

    console.log(response)
    router.replace(route.query.to ? String(route.query.to) : '/login?reset_password=true')
  }
  catch (e) {
    error.value = e.response.data.message
    console.log(e.response.data)
  }

  loading.value = false
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative">
      <!-- 👉 Top shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="auth-v1-bottom-shape d-none d-sm-block text-primary"
      />
      <VCard
        class="auth-card pa-2"
        max-width="448"
      >
        <VCardItem class="justify-center">
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
          <h6 class="text-h6 mb-1">
            Forgot Password?
          </h6>
          <p class="mb-0">
            Don't worry! Enter your email address, and we'll send you a link to reset it securely. 🔒"
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  autofocus
                  label="Email"
                  type="email"
                />
                <p
                  v-if="error"
                  style="color: #DF3333"
                  class="mt-2"
                >
                  {{ error }}
                </p>
                <!-- reset password -->
                <VBtn
                  block
                  type="submit"
                  variant="outlined"
                  class="my-4"
                  :loading="loading"
                  @click="submit"
                >
                  Send Reset Link
                </VBtn>

                <!-- back to login -->
                <RouterLink
                  class="d-flex align-center justify-center"
                  :to="{ name: 'login' }"
                >
                  <VIcon
                    icon="bx-chevron-left"
                    class="flip-in-rtl"
                  />
                  <span>Back to login</span>
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>

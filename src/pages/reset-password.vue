<script setup lang="ts">
import axiosIns from '@/plugins/axios'
import authV1BottomShape from '@images/svg/bottom-illustration.svg?raw'
import authV1TopShape from '@images/svg/top-illustration.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const route = useRoute()
const router = useRouter()

const loading = ref(false)

const form = ref({
  password: '',
  confirm_password: '',
})

const submit = async () => {
  // router.replace(route.query.to ? String(route.query.to) : '/login')
  loading.value = ref(true)

  const urlParams = new URLSearchParams(window.location.search)

  console.log(urlParams.get('uid'), urlParams.get('token'))
  try {
    if (form.value.password === form.value.confirm_password) {
      const response = await axiosIns.post(`/users/reset-password-confirm/${urlParams.get('uid')}/${urlParams.get('token')}`, {
        password: form.value.password,
        confirm_password: form.value.confirm_password,
      })

      console.log(response)
      router.replace(route.query.to ? String(route.query.to) : '/login?reset-success=true')
    }
    else {
      alert('Please re-check your password')
    }
  }
  catch (e) {
    // router.replace(route.query.to ? String(route.query.to) : '/login')
    console.log(e)
  }
  loading.value = false
}

onMounted(() => {
  console.log()
})
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
            Reset your Password
          </h6>
          <p class="mb-0">
            Create and confirm your new password.
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  autofocus
                  label="Password"
                  type="password"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="form.confirm_password"
                  autofocus
                  label="Confirm Password"
                  type="password"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <!-- reset password -->
                <VBtn
                  block
                  type="submit"
                  class="my-4"
                  :loading="loading"
                  variant="outlined"
                  @click="submit"
                >
                  Reset Password
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

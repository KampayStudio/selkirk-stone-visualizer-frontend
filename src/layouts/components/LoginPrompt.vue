<script setup lang="ts">
const isShow = ref(false)

const triggerDialog = () => {
  isShow.value = !isShow.value
}

defineExpose({ triggerDialog })
</script>

<template>
  <div>
    <VDialog
      v-model="isShow"
      max-width="500"
    >
      <VCard class="text-center px-10 py-6">
        <VCardText>
          <VBtn
            icon
            variant="outlined"
            color="warning"
            class="my-4"
            style=" block-size: 88px;inline-size: 88px; pointer-events: none;"
          >
            <span class="text-5xl">!</span>
          </VBtn>

          <h6 class="text-lg font-weight-medium">
            Don't miss out!
          </h6>

          <p class="text-body-1">
            Sign in to explore this feature or create an account to access this feature.
          </p>
        </VCardText>

        <VCardActions class="align-center justify-center gap-2">
          <RouterLink to="/login">
            <VBtn variant="outlined">
              Sign in
            </VBtn>
          </RouterLink>

          <RouterLink to="/register">
            <VBtn variant="elevated">
              Create account
            </VBtn>
          </RouterLink>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

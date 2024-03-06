<script setup lang="ts">
const isDialogOpen = ref(false)

const openDialog = () => {
  isDialogOpen.value = true
}

defineExpose({ openDialog })
</script>

<template>
  <div>
    <VDialog v-model="isDialogOpen">
      <VCard class="text-center px-10 py-6 mx-auto">
        <VCardText>
          <VBtn
            icon
            variant="text"
            color="info"
            class="my-4"
            style=" block-size: 88px;inline-size: 88px; pointer-events: none;"
          >
            <span class="text-5xl"><VIcon icon="bx-info-circle" /></span>
          </VBtn>
          <h5 class="text-h5">
            Awesome!
          </h5>
          <h6 class="text-lg font-weight-medium mt-3">
            We've just sent a password reset link to your email.
          </h6>
        </VCardText>

        <VCardActions class="align-center justify-center gap-2">
          <VBtn
            variant="elevated"
            @click="isDialogOpen = !isDialogOpen"
          >
            Proceed
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

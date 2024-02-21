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
            variant="outlined"
            color="success"
            class="my-4"
            style=" block-size: 88px;inline-size: 88px; pointer-events: none;"
          >
            <span class="text-5xl"><VIcon icon="bx-check" /></span>
          </VBtn>

          <h6 class="text-lg font-weight-medium">
            Your email has been successfully verified. <br> You're all set to enjoy our platform to the fullest.
          </h6>
        </VCardText>

        <VCardActions class="align-center justify-center gap-2">
          <VBtn
            variant="elevated"
            @click="isDialogOpen = !isDialogOpen"
          >
            Confirm
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

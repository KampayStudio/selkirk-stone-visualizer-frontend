<script setup lang="ts">
const isShow = ref(false)

const triggerDialog = (show: boolean) => {
  isShow.value = show
}

console.log('hello')
defineExpose({ triggerDialog })
</script>

<template>
  <div>
    <VDialog
      v-model="isShow"
      max-width="500"
    >
      <VCard class="text-center px-10 py-6">
        <VCardText class="d-flex justify-center flex-column align-center text-center">
          <div class="loader" />

          <h6 class="text-lg font-weight-medium mt-5">
            Loading, Please wait...
          </h6>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<style lang="scss" scoped>
.loader{
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  block-size:2rem;
  border-block-start: 6px solid rgb(41,77,32);
  inline-size:2rem
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% {transform: rotate(360deg) }
}
</style>

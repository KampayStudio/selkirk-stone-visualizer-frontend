<script setup lang="ts">
const props = defineProps(['image'])
</script>

<template>
  <div class="d-flex justify-center">
    <div class="image-container">
      <img
        :src="image.image"
        class="img-background"
      >
    </div>
  </div>
</template>

<style lang="scss">
.image-container {
  position: relative;

  img {
    border-radius: 10px;
    block-size: auto;
    inline-size: 100%;
    max-block-size: 80vh;
  }
}
</style>

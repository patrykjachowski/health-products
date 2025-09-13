<template>
  <div class="image-zoom-container">
    <NuxtImg
        provider="prismic"
        :src="image"
        alt="Product image"
        loading="lazy"
        class="zoomed-image"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
}>()
</script>

<style scoped>
.image-zoom-container {
  overflow: hidden;
  border-radius: 0.375rem;
  margin-right: 2rem;
}

.zoomed-image {
  transform: scale(1.4);
  transform-origin: top;
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
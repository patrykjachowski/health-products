<template>
  <div class="image-zoom-container mr-4 sm:mr-8">
    <NuxtImg
      provider="prismic"
      :src="image"
      :alt="`Zdjęcie produktu`"
      loading="lazy"
      class="zoomed-image w-24 h-36 sm:w-16 sm:h-16"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string
}>()
</script>

<style scoped>
.image-zoom-container {
  overflow: hidden;
  border-radius: 0.375rem;
}

.zoomed-image {
  transform: scale(1.4);
  transform-origin: top;
  object-fit: cover;
}
</style>

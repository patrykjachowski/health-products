<template>
  <button
    class="cart-button"
    :disabled="isDisabled"
    @click="$emit('click')"
  >
    <IconCart v-if="state === 'default'" />
    <IconSpinner v-if="state === 'loading'" />
    <IconCheck v-if="state === 'success'" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  state: 'default' | 'loading' | 'success'
}>()

defineEmits<{
  (e: 'click'): void
}>()

const isDisabled = computed(() => ['loading', 'success'].includes(props.state))
</script>

<style scoped>
.cart-button {
  @apply w-10 h-10 p-2 sm:mr-4
  text-black
  border-[3px] border-black
  rounded-full
  transition-colors
  hover:bg-black hover:text-white;
}
</style>

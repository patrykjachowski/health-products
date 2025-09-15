<template>
  <button
    class="cart-button flex items-center justify-center"
    :class="{ 'cart-button-success': state === 'success' }"
    :disabled="isDisabled"
    :aria-label="getAriaLabel()"
    @click="$emit('click')"
  >
    <Icon
      :name="iconConfig.name"
      :size="iconConfig.size"
      :class="iconConfig.class"
    />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  state: 'default' | 'loading' | 'success' | 'remove'
}>()

defineEmits<{
  (e: 'click'): void
}>()

const isDisabled = computed(() => ['loading', 'success'].includes(props.state))

const getAriaLabel = () => {
  switch (props.state) {
    case 'loading':
      return 'Dodawanie do koszyka...'
    case 'success':
      return 'Produkt dodany do koszyka'
    case 'remove':
      return 'Usuń z koszyka'
    default:
      return 'Dodaj do koszyka'
  }
}

const iconConfig = computed(() => {
  switch (props.state) {
    case 'loading':
      return {
        name: 'svg-spinners:270-ring-with-bg',
        size: '20',
        class: 'pb-1',
      }
    case 'success':
      return {
        name: 'material-symbols:check-rounded',
        size: '24',
      }
    case 'remove':
      return {
        name: 'solar:cart-cross-bold',
        size: '24',
        class: 'scale-x-[-1]',
      }
    default:
      return {
        name: 'majesticons:shopping-cart',
        size: '20',
        class: 'scale-x-[-1]',
      }
  }
})
</script>

<style scoped>
.cart-button {
  width: 2.5rem;
  height: 2.5rem;
  color: black;
  border: 3px solid black;
  border-radius: 9999px;
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

@media (min-width: 640px) {
  .cart-button {
    margin-right: 1rem;
  }
}

.cart-button:hover,
.cart-button-success {
  background-color: black;
  color: white;
}
</style>

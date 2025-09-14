<template>
  <div>
    <ProductsList
      :products="cartProducts"
      title="Special Products"
    />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const store = useCartStore()
const cartProducts = store.items
</script>

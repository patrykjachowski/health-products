<template>
  <div>
    <h1 class="text-3xl font-bold my-8 text-center">
      Health Labs Cart - Cart
    </h1>
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

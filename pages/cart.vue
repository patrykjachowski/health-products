<template>
  <div>
    <ProductsList
      v-if="products.length"
      :products="products"
      title="Special Products"
      mode="cart"
    />
    <div
      v-else
      class="flex flex-col gap-6 items-center pt-80"
    >
      <Icon
        name="bi:cart-dash"
        size="100"
      />
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Twój koszyk jest pusty.
        </h1>
        <p class="text-lg">
          Dodaj do niego produkty, aby móc rozpocząć składanie zamówienia.
        </p>
      </div>
      <NuxtLink
        to="/"
        class="rounded-md p-3 text-sm font-medium bg-gray-700 text-white"
      >Rozpocznij zakupy</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const store = useCartStore()
const products = store.items
</script>

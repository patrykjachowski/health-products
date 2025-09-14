<template>
  <h2 class="text-2xl text-center font-bold mt-8 mb-4">
    {{ title }}
  </h2>
  <div v-if="isLoading">
    <!--    TODO: Make a skeleton loading component -->
    LOADING
  </div>
  <div
    v-else
    class="mb-20"
  >
    <ProductsHeader />
    <ul class="space-y-2 list-none">
      <ProductListItem
        v-for="product in products"
        v-bind="product"
        :key="product.id"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  products: Product[]
  isLoading?: boolean
  title?: string
  mode?: 'cart' | undefined
}>()
</script>

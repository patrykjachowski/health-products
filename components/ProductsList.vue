<template>
  <h2 class="text-2xl mt-8 mb-2">
    {{ title }}
  </h2>
  <ProductsHeader />
  <ul class="space-y-2 list-none">
    <ProductListItem
      v-for="product in products"
      :key="product.id"
      v-bind="product"
      :amount="1"
    />
  </ul>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  products: Product[]
  title?: string
}>()
</script>

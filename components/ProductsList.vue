<template>
  <h2 class="text-2xl mt-8 mb-2">
    {{ title }}
  </h2>
  <div v-if="isLoading">
    LOADING
  </div>
  <div v-else>
    <ProductsHeader />
    <ul class="space-y-2 list-none">
      <ProductListItem
        v-for="product in products"
        :key="product.id"
        v-bind="product"
        :amount="1"
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
}>()
</script>

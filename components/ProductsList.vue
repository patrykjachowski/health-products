<template>
  <h2 class="text-2xl text-center font-bold mt-8 mb-4">
    {{ title }}
  </h2>
  <div class="mt-8 sm:mt-0 mb-20">
    <ProductsHeader />
    <ul
      v-if="isPending"
      class="space-y-2 list-none"
    >
      <ProductListItemSkeleton
        v-for="i in 10"
        :key="i"
      />
    </ul>
    <ul class="space-y-2 list-none">
      <ProductListItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        :product-amount="product.amount"
        :mode="mode"
        :is-pending="isPending"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  products: Product[]
  isPending?: boolean
  title?: string
  mode?: 'remove' | undefined
}>()
</script>

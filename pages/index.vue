<template>
  <div class="container">
    <div class="p-4 sm:p-6 lg:p-8 font-sans">
      <ProductsList
        :products="specialProducts"
        :is-pending="pending"
        title="Poznaj nasze specjalne oferty"
      />
      <ProductsList
        :products="originalProducts"
        :is-pending="pending"
        title="Poznaj nasze bestsellery"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

// TODO: handle error
const {
  data: products,
  pending,
  error,
} = await useLazyFetch<Product[]>('/api/product/products')

const specialProducts = computed(
  () => products.value?.filter(product => product.special) ?? [],
)

const originalProducts = computed(
  () => products.value?.filter(product => !product.special) ?? [],
)
</script>

<template>
  <div class="sm:p-4 lg:p-8 font-sans">
    <ProductsList
      :products="specialProductsUpdated || []"
      :is-pending="pending"
      title="Lista A"
    />
    <ProductsList
      :products="regularProductsUpdated || []"
      :is-pending="pending"
      title="Lista B"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const { data: products, pending } = await useLazyFetch<Product[]>(
  '/api/product/products',
)

const { items: cartProducts } = useCartStore()

const productsUpdated = computed(() => {
  if (!products.value) return []

  return products.value.map((product) => {
    const cartItem = cartProducts.find(item => item.id === product.id)
    return cartItem || product
  })
})

const specialProductsUpdated = computed(() => {
  return productsUpdated.value?.filter(product => product.special) || []
})

const regularProductsUpdated = computed(() => {
  return productsUpdated.value?.filter(product => !product.special) || []
})
</script>

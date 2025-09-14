<template>
  <div class="container">
    <div class="p-4 sm:p-6 lg:p-8 font-sans">
      <ProductsList
        :products="productsUpdated || []"
        :is-pending="pending"
        title="Poznaj nasze produkty"
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

const { items: cartProducts } = useCartStore()
const productsUpdated = computed(() => {
  if (!products.value) return

  return products.value.map((product) => {
    const isProductInCart = cartProducts.find(item => item.id === product.id)

    if (isProductInCart) {
      return isProductInCart
    }

    return product
  })
})
</script>

<template>
  <div class="sm:p-4 lg:p-8 font-sans">
    <ProductsList
      :products="productsUpdated || []"
      :is-pending="pending"
      title="Poznaj nasze produkty"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

// TODO: handle error
const { data: products, pending,
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

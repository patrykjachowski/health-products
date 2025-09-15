<template>
  <div class="sm:p-4 lg:p-8 font-sans">
    <!-- Error State -->
    <div
      v-if="error"
      class="text-center py-8"
    >
      <Icon
        name="material-symbols:error-outline"
        size="48"
        class="text-red-500 mx-auto mb-4"
      />
      <h2 class="text-xl font-semibold text-gray-900 mb-2">
        Wystąpił błąd
      </h2>
      <p class="text-gray-600 mb-4">
        Nie udało się załadować produktów. Spróbuj ponownie.
      </p>
      <button
        class="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
        aria-label="Odśwież stronę aby ponownie załadować produkty"
        @click="refresh()"
      >
        Odśwież stronę
      </button>
    </div>

    <!-- Loading and Product Lists -->
    <template v-else>
      <ProductsList
        :products="regularProductsUpdated || []"
        :is-pending="pending"
        title="Lista A"
      />
      <ProductsList
        :products="specialProductsUpdated || []"
        :is-pending="pending"
        title="Lista B"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const {
  data: products,
  pending,
  error,
  refresh,
} = await useLazyFetch<Product[]>('/api/product/products')

const { items: cartProducts } = useCartStore()

const productsUpdated = computed(() => {
  if (!products.value) return []

  return products.value.map((product) => {
    const cartItem = cartProducts.find(item => item.id === product.id)
    return cartItem || product
  })
})

// Lista A: Only original products (ignoring DM variants)
const regularProductsUpdated = computed(() => {
  if (!productsUpdated.value) return []

  // Get all unique base SKUs (without _dm suffix)
  const baseSkus = new Set(
    productsUpdated.value
      .filter(product => !product.sku.endsWith('_dm'))
      .map(product => product.sku),
  )

  // Return only original products that are in stock
  return productsUpdated.value.filter(
    product =>
      baseSkus.has(product.sku) && product.stock_status === 'IN_STOCK',
  )
})

// Lista B: DM products only when they have stock > 0
const specialProductsUpdated = computed(() => {
  if (!productsUpdated.value) return []

  // Return only DM variants that are in stock
  return productsUpdated.value.filter(
    product =>
      product.sku.endsWith('_dm') && product.stock_status === 'IN_STOCK',
  )
})
</script>

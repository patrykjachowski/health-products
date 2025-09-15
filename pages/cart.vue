<template>
  <div v-if="products.length">
    <ProductsList
      :products="products"
      mode="remove"
    />

    <div
      class="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 mx-4 sm:mx-0"
    >
      <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
      >
        <div class="text-center sm:text-left">
          <h3 class="text-lg font-semibold text-gray-900">
            Podsumowanie koszyka
          </h3>
          <p class="text-sm text-gray-600">
            {{ totalItems }}
            {{
              totalItems === 1
                ? "produkt"
                : totalItems < 5
                  ? "produkty"
                  : "produktów"
            }}
          </p>
        </div>
        <div class="text-center sm:text-right">
          <div class="text-xl sm:text-2xl font-bold text-gray-900">
            {{ formatCurrency(totalPrice) }}
          </div>
          <div class="text-sm text-gray-600">
            Łączna wartość
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col gap-6 items-center h-[calc(100vh-64px)] justify-center"
  >
    <Icon
      name="bi:cart-dash"
      class="scale-x-[-1]"
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
      class="rounded-md p-3 text-sm font-medium bg-gray-700 text-white hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
      aria-label="Przejdź do strony głównej aby rozpocząć zakupy"
    >Rozpocznij zakupy</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useFormatCurrency } from '~/utils/use-format-currency'

const store = useCartStore()
const products = store.items
const { totalItems, totalPrice } = storeToRefs(store)
const formatCurrency = useFormatCurrency
</script>

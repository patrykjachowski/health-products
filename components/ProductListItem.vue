<template>
  <!-- TODO: make a product list item component -->
  <!--  <li class="product-list-item"> -->
  <li
    class="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_1fr_1fr_auto] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 rounded-xl bg-white p-4 text-gray-500 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
  >
    <div class="flex sm:items-center">
      <ProductImage :image="image" />

      <div class="flex flex-col sm:flex-row justify-between">
        <div>
          <h2 class="font-bold text-gray-800 text-xl">
            {{ name }}
          </h2>
          <div class="sm:hidden text-black mt-2">
            Cena - {{ formatCurrency(price) }}
          </div>
          <div class="sm:hidden text-black">
            Ilość - {{ amount }}
          </div>
        </div>

        <div class="sm:hidden text-black font-bold">
          Suma - {{ summarizedPrice }}
        </div>
      </div>
    </div>

    <div class="hidden sm:flex items-center text-black">
      {{ formatCurrency(price) }}
    </div>
    <div class="hidden sm:flex items-center text-gray-700">
      {{ amount }}
    </div>
    <div class="hidden sm:flex items-center text-black font-bold">
      {{ summarizedPrice }}
    </div>
    <div class="flex sm:items-center">
      <CartButton />
    </div>
  </li>
</template>

<script setup lang="ts">
import ProductImage from '~/components/ProductImage.vue'
import { useFormatCurrency } from '~/utils/use-format-currency'

const props = defineProps<{
  name: string
  price: number
  amount: number
  image: string
}>()

const formatCurrency = (value: number) => useFormatCurrency(value)
const summarizedPrice = formatCurrency(props.price * props.amount)
</script>

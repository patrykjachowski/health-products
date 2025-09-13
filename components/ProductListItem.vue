<template>
  <li class="product-list-item transition-shadow duration-200 hover:shadow-lg">
  <div class="flex items-center col-span-2 md:col-span-1">
      <ProductImage :image="image"/>
      <h2 class="font-bold text-gray-800 text-base">
        {{ name }}
      </h2>
    </div>
    <div class="flex items-center text-black">
      {{ formatCurrency(price) }}
    </div>
    <div class="hidden md:flex items-center text-gray-700">
      {{ amount }}
    </div>
    <div class="flex items-center text-black font-bold">
      {{ summarizedPrice }}
    </div>
    <div class="flex items-center">
      <CartButton/>
    </div>
  </li>
</template>

<script setup lang="ts">
import ProductImage from "~/components/ProductImage.vue";
import { useFormatCurrency } from "~/utils/use-format-currency";

const props = defineProps<{
  name: string;
  price: number;
  amount: number;
  image: string;
}>();

const formatCurrency = value => useFormatCurrency(value)
const summarizedPrice = formatCurrency(props.price * props.amount);
</script>


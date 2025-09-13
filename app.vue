<template>
  <div class="container">
    <div class="p-4 sm:p-6 lg:p-8 font-sans">
      <h1 class="text-3xl font-bold my-8 text-center">
        Health Labs Cart
      </h1>
      <ProductsList
        :products="specialProducts"
        title="Special Products"
      />
      <ProductsList
        :products="originalProducts"
        title="Original Products"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const products = await $fetch('/api/product/products')
const specialProducts = products.filter(product => product.special)
const originalProducts = products.filter(product => !product.special)
</script>

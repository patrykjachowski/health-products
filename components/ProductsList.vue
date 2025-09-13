<template>
  <ul class="space-y-2 list-none">
    <ProductListItem
      v-for="product in products"
      :key="product.id"
      :name="product.name"
      :price="product.price"
      :amount="1"
      :image="product.img"
    />
  </ul>
</template>

<script setup lang="ts">
const products = await $fetch('/api/product/products')
</script>

<template>
  <h2 class="text-2xl mt-8 mb-2">
    {{ title }}
  </h2>
  <ProductsHeader />
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
defineProps<{
  products: Product[]
  title?: string
}>()
</script>

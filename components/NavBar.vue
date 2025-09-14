<template>
  <div class="border-b-2 border-gray-300">
    <div class="flex h-16 items-center justify-between">
      <h1 class="text-xl font-bold text-gray-900">
        Health Products
      </h1>

      <div class="flex space-x-4">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="getNavItemClasses(item)"
          :aria-current="item.current ? 'page' : undefined"
        >{{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation = computed(() => [
  { name: 'Product list', href: '/', current: route.path === '/' },
  { name: 'Cart', href: '/cart', current: route.path === '/cart' },
])

const getNavItemClasses = computed(() => {
  return item => [
    item.current
      ? 'bg-gray-700 text-white'
      : 'text-gray-700  hover:bg-gray-200',
    'rounded-md px-3 py-2 text-sm font-medium',
  ]
})
</script>

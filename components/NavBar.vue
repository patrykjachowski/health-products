<template>
  <div class="border-b-2 border-gray-300">
    <div class="flex h-16 items-center justify-between">
      <div class="text-xl font-bold text-gray-900">
        Health Products
      </div>

      <div class="flex space-x-4">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="getNavItemClass(item)"
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
  { name: 'Lista produktów', href: '/', current: route.path === '/' },
  { name: 'Koszyk', href: '/cart', current: route.path === '/cart' },
])

const getNavItemClass = computed(() => {
  return item => [
    item.current
      ? 'bg-gray-700 text-white'
      : 'text-gray-700  hover:bg-gray-200',
    'rounded-md px-3 py-2 text-sm font-medium',
  ]
})
</script>

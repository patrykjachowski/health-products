<template>
  <div class="border-b-2 border-gray-300">
    <div class="flex h-16 items-center justify-between">
      <NuxtLink
        to="/"
        class="text-xl font-bold text-gray-900"
      >
        Health Products
      </NuxtLink>

      <div class="flex space-x-4 justify-end">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="getNavItemClass(item)"
          :aria-current="item.current ? 'page' : undefined"
        >
          <Icon
            :name="item.icon"
            class="sm:hidden"
            size="20"
          />
          <span class="hidden sm:block">
            {{ item.name }}
          </span>
          <span v-if="item.name === 'Koszyk' && cartStore.totalItems > 0">
            <sup>({{ cartStore.totalItems }})</sup>
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

type NavigationItem = {
  name: string
  href: string
  current: boolean
  icon: string
}

const route = useRoute()
const cartStore = useCartStore()

const navigation = computed((): NavigationItem[] => [
  {
    name: 'Lista produktów',
    href: '/',
    current: route.path === '/',
    icon: 'material-symbols:event-list-outline-rounded',
  },
  {
    name: 'Koszyk',
    href: '/cart',
    current: route.path === '/cart',
    icon: 'streamline-ultimate:shopping-cart-full-bold',
  },
])

const getNavItemClass = computed(() => {
  return (item: NavigationItem) => [
    item.current
      ? 'bg-gray-700 text-white'
      : 'text-gray-700  hover:bg-gray-200',
    'flex items-center rounded-md px-3 py-2 text-sm font-medium',
  ]
})
</script>

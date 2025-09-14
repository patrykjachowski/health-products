<template>
  <!-- TODO: make a product list item component -->
  <!--  <li class="product-list-item"> -->
  <li
    class="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_1fr_1fr_auto] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 rounded-xl bg-white p-4 text-gray-500 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
  >
    <div class="flex sm:items-center">
      <ProductImage :image="img" />

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
      <input
        v-model="amount"
        type="number"
        class="w-20 px-3 py-2 text-sm hover:border hover:border-gray-300  rounded-md transition-colors duration-200 focus:outline-none focus:ring-0"
      >
    </div>
    <div class="hidden sm:flex items-center text-black font-bold">
      {{ summarizedPrice }}
    </div>

    <div class="flex sm:items-center">
      <ProductListActionButton
        :state="actionButtonState"
        @click="handleAction"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import ProductImage from '~/components/ProductImage.vue'
import { useFormatCurrency } from '~/utils/use-format-currency'
import { useCartStore } from '~/stores/cart'
import type { Product } from '~/types/product'
import ProductListActionButton from '~/components/ProductListActionButton.vue'

const props = withDefaults(
  defineProps<Product & {
    mode?: 'default' | 'remove'
    productAmount?: number
  }>(), {
    mode: 'default',
  })

const amount = ref(1)

const formatCurrency = (value: number) => useFormatCurrency(value)
const summarizedPrice = computed(() => formatCurrency(props.price * amount.value))

const cartStore = useCartStore()
const actionButtonState = ref<'default' | 'loading' | 'success' | 'remove'>(
  props.mode === 'remove' ? 'remove' : 'default',
)

const handleAction = () => {
  return props.mode === 'remove' ? removeFromCart() : addToCart()
}

const addToCart = async () => {
  const product = computed(() => ({ ...props, amount: amount.value }))

  try {
    actionButtonState.value = 'loading'

    await $fetch('/api/cart/add', {
      method: 'POST',
      body: product.value,
    })

    actionButtonState.value = 'success'
    cartStore.addToCart(product.value)

    console.log('Product added to cart successfully', props.name)
  }
  catch (error) {
    console.error('Error adding product to cart:', error)
  }
}

const removeFromCart = async () => {
  const product = computed(() => ({ ...props }))

  try {
    actionButtonState.value = 'loading'

    await $fetch('/api/cart/remove', {
      method: 'POST',
      body: product.value,
    })

    actionButtonState.value = 'remove'

    cartStore.removeFromCart(product.value)

    console.log('Product remove from cart successfully', props.name)
  }
  catch (error) {
    console.error('Error removing product from cart:', error)
  }
}

onMounted(() => {
  if (props.productAmount !== undefined) {
    amount.value = props.productAmount
  }
})
</script>

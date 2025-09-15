<template>
  <li
    class="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_1fr_1fr_auto] md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 rounded-xl bg-white p-4 text-gray-500 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md"
  >
    <div class="flex sm:items-center">
      <ProductImage :image="product.img" />

      <div class="flex flex-col sm:flex-row justify-between">
        <div>
          <h2 class="font-bold text-gray-800 text-xl">
            {{ product.name }}
          </h2>
          <div class="sm:hidden text-black mt-2">
            Cena - {{ formatCurrency(product.price) }}
          </div>
          <div class="sm:hidden text-black">
            Ilość -
            <input
              v-if="mode !== 'remove'"
              v-model="amount"
              :disabled="isProductInCart"
              type="number"
              min="1"
              :aria-label="`Ilość produktu ${product.name}`"
              class="w-20 px-3 py-2 text-sm rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 enabled:hover:border enabled:hover:border-gray-300"
            >
          </div>
        </div>

        <div class="sm:hidden text-black font-bold">
          Suma - {{ summarizedPrice }}
        </div>
      </div>
    </div>

    <div class="hidden sm:flex items-center text-black">
      {{ formatCurrency(product.price) }}
    </div>
    <div class="hidden sm:flex items-center text-gray-700">
      <input
        v-if="mode !== 'remove'"
        v-model="amount"
        :disabled="isProductInCart"
        type="number"
        min="1"
        :aria-label="`Ilość produktu ${product.name}`"
        class="w-20 px-3 py-2 text-sm rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 enabled:hover:border enabled:hover:border-gray-300"
      >
      <span v-else>
        {{ amount }}
      </span>
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
import { onMounted } from 'vue'
import ProductImage from '~/components/ProductImage.vue'
import { useFormatCurrency } from '~/utils/use-format-currency'
import { useErrorHandler } from '~/utils/use-error-handler'
import { useCartStore } from '~/stores/cart'
import type { Product } from '~/types/product'
import ProductListActionButton from '~/components/ProductListActionButton.vue'

const props = withDefaults(
  defineProps<{
    product: Product
    mode?: 'default' | 'remove'
    productAmount?: number
  }>(),
  {
    mode: 'default',
  },
)

const amount = ref(1)
const formatCurrency = (value: number) => useFormatCurrency(value)
const summarizedPrice = computed(() =>
  formatCurrency(props.product.price * amount.value),
)

const cartStore = useCartStore()
const { handleError } = useErrorHandler()
const isProductInCart = computed(() => cartStore.isInCart(props.product))

const actionButtonState = ref<'default' | 'loading' | 'success' | 'remove'>(
  props.mode === 'remove'
    ? 'remove'
    : isProductInCart.value
      ? 'success'
      : 'default',
)

const handleAction = () => {
  return props.mode === 'remove' ? removeFromCart() : addToCart()
}

const addToCart = async () => {
  try {
    actionButtonState.value = 'loading'

    const response = await $fetch('/api/cart/add', {
      method: 'POST',
      body: {
        ...props.product,
        amount: amount.value,
      },
    })

    // Use the best variant returned from the API
    cartStore.addToCart(response.product)

    actionButtonState.value = 'success'
  }
  catch (error) {
    handleError(error, 'Adding product to cart')
    actionButtonState.value = 'default'
  }
}

const removeFromCart = async () => {
  try {
    actionButtonState.value = 'loading'

    await $fetch('/api/cart/remove', {
      method: 'POST',
      body: {
        ...props.product,
        amount: amount.value,
      },
    })

    actionButtonState.value = 'remove'

    cartStore.removeFromCart(props.product)
  }
  catch (error) {
    handleError(error, 'Removing product from cart')
  }
}

onMounted(() => {
  if (props.productAmount !== undefined) {
    amount.value = props.productAmount
  }
})
</script>

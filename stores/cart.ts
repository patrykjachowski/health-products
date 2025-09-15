import type { Product } from '~/types/product'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Product[]>([])

  const totalItems = computed(() => items.value.length)

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price, 0),
  )

  const addToCart = (product: Product) => {
    const existingItemIndex = items.value.findIndex(item =>
      item.sku === product.sku
      || (item.sku.includes(product.sku.replace('_dm', '')) && product.sku.includes(item.sku.replace('_dm', ''))),
    )

    if (existingItemIndex > -1) {
      items.value[existingItemIndex].amount += product.amount
    }
    else {
      items.value.push(product)
    }
  }

  const removeFromCart = (product: Product) => {
    const index = items.value.findIndex(item => item.sku === product.sku)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const isInCart = (product: Product) => {
    return items.value.some(item =>
      item.sku === product.sku
      || (item.sku.includes(product.sku.replace('_dm', '')) && product.sku.includes(item.sku.replace('_dm', ''))),
    )
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    isInCart,
    clearCart,
  }
})

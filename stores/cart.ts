import type { Product } from '~/types/product'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Product[]>([])

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.amount, 0),
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + (item.price * item.amount), 0),
  )

  // Helper function to normalize SKU for comparison
  const normalizeSku = (sku: string) => sku.replace('_dm', '')

  // Helper function to check if two products are the same (ignoring DM suffix)
  const isSameProduct = (sku1: string, sku2: string) =>
    normalizeSku(sku1) === normalizeSku(sku2)

  const addToCart = (product: Product) => {
    const existingItemIndex = items.value.findIndex(item =>
      isSameProduct(item.sku, product.sku),
    )

    if (existingItemIndex > -1) {
      items.value[existingItemIndex].amount += product.amount
    }
    else {
      items.value.push(product)
    }
  }

  const removeFromCart = (product: Product) => {
    const index = items.value.findIndex(item => isSameProduct(item.sku, product.sku))
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const isInCart = (product: Product) => {
    return items.value.some(item => isSameProduct(item.sku, product.sku))
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

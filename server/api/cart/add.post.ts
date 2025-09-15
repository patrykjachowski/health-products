import type { Product } from '~/types/product'
import { ProductService } from '~/server/services/product.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Product & { amount: number }

  const requiredFields = ['sku', 'amount']
  const missingFields = requiredFields.filter(field => !body[field as keyof Product])

  if (missingFields.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields: ${missingFields.join(', ')}`,
    })
  }

  if (body.amount <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Amount must be a positive number',
    })
  }

  try {
    const productService = new ProductService()
    const bestVariant = await productService.getBestVariantForCart(body)

    if (!bestVariant) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product not available',
      })
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      status: 'success',
      message: `Product ${bestVariant.name} (SKU: ${bestVariant.sku}) added to cart with amount: ${bestVariant.amount}.`,
      product: bestVariant,
    }
  }
  catch (error) {
    console.error('Error adding product to cart:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add product to cart',
    })
  }
})

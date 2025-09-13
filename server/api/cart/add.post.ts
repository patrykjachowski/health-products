import type { Product } from '~/types/product'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Product

  // Walidacja wymaganych pól
  const requiredFields = ['name', 'sku', 'price']
  const missingFields = requiredFields.filter(field => !body[field as keyof Product])

  if (missingFields.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields: ${missingFields.join(', ')}`,
    })
  }

  if (body.price <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Price must be greater than 0',
    })
  }

  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    status: 'success',
    message: `Product ${body.name} (SKU: ${body.sku}) added to cart.`,
  }
})

import type { Product } from '~/types/product'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Product & { amount: number }

  const requiredFields = ['id', 'uid', 'name', 'sku', 'price', 'img', 'stock_status', 'amount']
  const missingFields = requiredFields.filter(field => !body[field as keyof Product])

  if (missingFields.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required fields: ${missingFields.join(', ')}`,
    })
  }

  const validations = [
    { condition: body.price <= 0, message: 'Price must be greater than 0' },
    { condition: body.id <= 0, message: 'ID must be a positive number' },
    { condition: !['IN_STOCK', 'OUT_OF_STOCK'].includes(body.stock_status), message: 'Stock status must be either IN_STOCK or OUT_OF_STOCK' },
    { condition: body.amount <= 0, message: 'Amount must be a positive number' },
    { condition: !body.uid || body.uid.trim() === '', message: 'UID is required and cannot be empty' },
    { condition: !body.name || body.name.trim() === '', message: 'Name is required and cannot be empty' },
    { condition: !body.sku || body.sku.trim() === '', message: 'SKU is required and cannot be empty' },
    { condition: !body.img || body.img.trim() === '', message: 'Image URL is required and cannot be empty' },
  ]

  for (const { condition, message } of validations) {
    if (condition) {
      throw createError({ statusCode: 400, statusMessage: message })
    }
  }

  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    status: 'success',
    message: `Product ${body.name} (SKU: ${body.sku}) added to cart with amount: ${body.amount}.`,
  }
})

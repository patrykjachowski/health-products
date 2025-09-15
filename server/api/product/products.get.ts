import { ProductService } from '~/server/services/product.service'

export default defineEventHandler(async () => {
  try {
    const productService = new ProductService()

    return await productService.getProducts()
  }
  catch (error) {
    // Log error in development
    if (import.meta.dev) {
      console.error('Error fetching products:', error)
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch products',
    })
  }
})

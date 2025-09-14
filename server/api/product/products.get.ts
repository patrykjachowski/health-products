import { ProductService } from '~/server/services/product.service'

export default defineEventHandler(async () => {
  const productService = new ProductService()
  return await productService.getProducts()
})

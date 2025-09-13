import type { Product } from '~/types/product'

export default defineEventHandler(async (): Promise<Product[]> => {
  const [cmsProducts, magentoProducts] = await Promise.all([
    $fetch('/api/cms/products'),
    $fetch('/api/magento/products'),
  ])

  return magentoProducts
    .map((magentoProduct) => {
      const cmsProduct = cmsProducts.find(cms => magentoProduct.sku.includes(cms.sku))
      return cmsProduct
        ? {
            ...cmsProduct,
            ...magentoProduct,
            special: magentoProduct.sku.endsWith('_dm'),
          }
        : null
    })
    .filter((product): product is Product => product !== null)
})

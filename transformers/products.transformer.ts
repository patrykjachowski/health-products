import type { CmsProduct, MagentoProduct, Product } from '~/types/product'

export const productsTransformer = (magentoProducts: MagentoProduct[], cmsProducts: CmsProduct[]): Product[] => {
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
}

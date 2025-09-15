import type { Product, CmsProduct, MagentoProduct } from '~/types/product'

export class ProductService {
  async getProducts() {
    const cached = await useStorage('cache').getItem('products')
    if (cached) return cached

    const [getCmsProducts, getMagentoProducts] = await Promise.all([
      $fetch('/api/cms/products'),
      $fetch('/api/magento/products'),
    ])

    const products = this.mergeProducts(getCmsProducts, getMagentoProducts)
    await useStorage('cache').setItem('products', products)
    return products
  }

  mergeProducts(cmsProducts: CmsProduct[], magentoProducts: MagentoProduct[]): Product[] {
    return cmsProducts
      .map((cmsProduct) => {
        const matching = magentoProducts.filter(mp => mp.sku.includes(cmsProduct.sku))
        if (!matching.length) return null

        const dm = matching.find(mp => mp.sku.endsWith('_dm'))
        const regular = matching.find(mp => !mp.sku.endsWith('_dm'))

        const { selected, isSpecial } = this.selectBestVariant(dm, regular)
        return selected ? { ...cmsProduct, ...selected, amount: 1, special: isSpecial || false } : null
      })
      .filter((product): product is Product => product !== null)
  }

  // Method to get the best variant for cart operations
  async getBestVariantForCart(baseProduct: Product): Promise<Product | null> {
    const [cmsProducts, magentoProducts] = await Promise.all([
      $fetch('/api/cms/products'),
      $fetch('/api/magento/products'),
    ])

    // Extract base SKU (remove _dm suffix if present)
    const baseSku = baseProduct.sku.replace('_dm', '')

    // Find the CMS product that matches the base SKU
    const cmsProduct = cmsProducts.find(cp => cp.sku === baseSku)
    if (!cmsProduct) return null

    // Find all Magento variants for this product
    const matching = magentoProducts.filter(mp => mp.sku.includes(baseSku))
    if (!matching.length) return null

    const dm = matching.find(mp => mp.sku.endsWith('_dm'))
    const regular = matching.find(mp => !mp.sku.endsWith('_dm'))

    const { selected, isSpecial } = this.selectBestVariant(dm, regular)

    if (!selected) return null

    return {
      ...cmsProduct,
      ...selected,
      amount: baseProduct.amount,
      special: isSpecial || false,
    }
  }

  private selectBestVariant(dm?: MagentoProduct, regular?: MagentoProduct): { selected: MagentoProduct | null, isSpecial: boolean } {
    if (dm && regular) {
      if (dm.stock_status === 'IN_STOCK') return { selected: dm, isSpecial: true }
      if (regular.stock_status === 'IN_STOCK') return { selected: regular, isSpecial: false }
      return { selected: null, isSpecial: false }
    }

    if (regular?.stock_status === 'IN_STOCK') return { selected: regular, isSpecial: false }
    if (dm?.stock_status === 'IN_STOCK') return { selected: dm, isSpecial: true }
    return { selected: null, isSpecial: false }
  }
}

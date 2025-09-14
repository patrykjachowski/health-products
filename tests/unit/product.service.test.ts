import { describe, it, expect, beforeEach } from 'vitest'
import { ProductService } from '~/server/services/product.service'
import type { CmsProduct, MagentoProduct } from '~/types/product'

describe('ProductService', () => {
  let productService: ProductService

  beforeEach(() => {
    productService = new ProductService()
  })

  // Test data factory functions
  const createMagentoProduct = (overrides: Partial<MagentoProduct> = {}): MagentoProduct => ({
    sku: 'test_sku_pl',
    id: 1,
    name: 'Test Product',
    stock_status: 'IN_STOCK',
    price: 99.99,
    ...overrides,
  })

  const createCmsProduct = (overrides: Partial<CmsProduct> = {}): CmsProduct => ({
    uid: 'test-1',
    sku: 'test_sku_pl',
    img: 'test.jpg',
    ...overrides,
  })

  describe('selectBestVariant', () => {
    it('should prefer DM variant when both are in stock', () => {
      const dm = createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, price: 119.99 })
      const regular = createMagentoProduct()

      const result = (productService as unknown as { selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => MagentoProduct | null }).selectBestVariant(dm, regular)
      expect(result).toEqual(dm)
    })

    it('should fallback to regular when DM is out of stock', () => {
      const dm = createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, stock_status: 'OUT_OF_STOCK', price: 119.99 })
      const regular = createMagentoProduct()

      const result = (productService as unknown as { selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => MagentoProduct | null }).selectBestVariant(dm, regular)
      expect(result).toEqual(regular)
    })

    it('should return null when both are out of stock', () => {
      const dm = createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, stock_status: 'OUT_OF_STOCK', price: 119.99 })
      const regular = createMagentoProduct({ stock_status: 'OUT_OF_STOCK' })

      const result = (productService as unknown as { selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => MagentoProduct | null }).selectBestVariant(dm, regular)
      expect(result).toBeNull()
    })

    it('should return DM when only DM variant exists and is in stock', () => {
      const dm = createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, price: 119.99 })

      const result = (productService as unknown as { selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => MagentoProduct | null }).selectBestVariant(dm, undefined)
      expect(result).toEqual(dm)
    })

    it('should return regular when only regular variant exists and is in stock', () => {
      const regular = createMagentoProduct()

      const result = (productService as unknown as { selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => MagentoProduct | null }).selectBestVariant(undefined, regular)
      expect(result).toEqual(regular)
    })

    it('should return null when variants exist but are out of stock', () => {
      const dm = createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, stock_status: 'OUT_OF_STOCK' })
      const regular = createMagentoProduct({ stock_status: 'OUT_OF_STOCK' })

      const result = (productService as unknown as { selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => MagentoProduct | null }).selectBestVariant(dm, undefined)
      expect(result).toBeNull()

      const result2 = (productService as unknown as { selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => MagentoProduct | null }).selectBestVariant(undefined, regular)
      expect(result2).toBeNull()
    })
  })

  describe('mergeProducts', () => {
    it('should merge CMS and Magento products correctly', () => {
      const cmsProducts = [createCmsProduct()]
      const magentoProducts = [createMagentoProduct()]

      const result = productService.mergeProducts(cmsProducts, magentoProducts)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        uid: 'test-1',
        sku: 'test_sku_pl',
        img: 'test.jpg',
        id: 1,
        name: 'Test Product',
        stock_status: 'IN_STOCK',
        price: 99.99,
        amount: 1,
      })
    })

    it('should prefer DM variant when both are in stock', () => {
      const cmsProducts = [createCmsProduct()]
      const magentoProducts = [
        createMagentoProduct(),
        createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, name: 'Test Product DM', price: 119.99 }),
      ]

      const result = productService.mergeProducts(cmsProducts, magentoProducts)

      expect(result).toHaveLength(1)
      expect(result[0].sku).toBe('test_sku_pl_dm')
      expect(result[0].price).toBe(119.99)
    })

    it('should filter out products with no matching Magento products', () => {
      const cmsProducts = [createCmsProduct({ sku: 'non_existent_sku' })]
      const magentoProducts = [createMagentoProduct({ sku: 'other_sku' })]

      const result = productService.mergeProducts(cmsProducts, magentoProducts)

      expect(result).toHaveLength(0)
    })

    it('should handle empty arrays', () => {
      const result = productService.mergeProducts([], [])
      expect(result).toHaveLength(0)
    })

    it('should handle multiple CMS products', () => {
      const cmsProducts = [
        createCmsProduct({ uid: 'test-1', sku: 'sku1' }),
        createCmsProduct({ uid: 'test-2', sku: 'sku2' }),
      ]
      const magentoProducts = [
        createMagentoProduct({ sku: 'sku1', id: 1 }),
        createMagentoProduct({ sku: 'sku2', id: 2 }),
      ]

      const result = productService.mergeProducts(cmsProducts, magentoProducts)

      expect(result).toHaveLength(2)
      expect(result[0].uid).toBe('test-1')
      expect(result[1].uid).toBe('test-2')
    })
  })
})

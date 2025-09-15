import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ProductService } from '~/server/services/product.service'
import type { CmsProduct, MagentoProduct, Product } from '~/types/product'

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

  const createProduct = (overrides: Partial<Product> = {}): Product => ({
    uid: 'test-1',
    sku: 'test_sku_pl',
    img: 'test.jpg',
    id: 1,
    name: 'Test Product',
    stock_status: 'IN_STOCK',
    price: 99.99,
    amount: 1,
    special: false,
    ...overrides,
  })

  describe('selectBestVariant', () => {
    it('should prefer DM variant when both are in stock', () => {
      const dm = createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, price: 119.99 })
      const regular = createMagentoProduct()

      const result = (productService as unknown as {
        selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => { selected: MagentoProduct | null, isSpecial: boolean }
      }).selectBestVariant(dm, regular)

      expect(result.selected).toEqual(dm)
      expect(result.isSpecial).toBe(true)
    })

    it('should fallback to regular when DM is out of stock', () => {
      const dm = createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, stock_status: 'OUT_OF_STOCK', price: 119.99 })
      const regular = createMagentoProduct()

      const result = (productService as unknown as {
        selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => { selected: MagentoProduct | null, isSpecial: boolean }
      }).selectBestVariant(dm, regular)

      expect(result.selected).toEqual(regular)
      expect(result.isSpecial).toBe(false)
    })

    it('should return null when both are out of stock', () => {
      const dm = createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, stock_status: 'OUT_OF_STOCK', price: 119.99 })
      const regular = createMagentoProduct({ stock_status: 'OUT_OF_STOCK' })

      const result = (productService as unknown as {
        selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => { selected: MagentoProduct | null, isSpecial: boolean }
      }).selectBestVariant(dm, regular)

      expect(result.selected).toBeNull()
      expect(result.isSpecial).toBe(false)
    })

    it('should return DM when only DM variant exists and is in stock', () => {
      const dm = createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, price: 119.99 })

      const result = (productService as unknown as {
        selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => { selected: MagentoProduct | null, isSpecial: boolean }
      }).selectBestVariant(dm, undefined)

      expect(result.selected).toEqual(dm)
      expect(result.isSpecial).toBe(true)
    })

    it('should return regular when only regular variant exists and is in stock', () => {
      const regular = createMagentoProduct()

      const result = (productService as unknown as {
        selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => { selected: MagentoProduct | null, isSpecial: boolean }
      }).selectBestVariant(undefined, regular)

      expect(result.selected).toEqual(regular)
      expect(result.isSpecial).toBe(false)
    })

    it('should return null when variants exist but are out of stock', () => {
      const dm = createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, stock_status: 'OUT_OF_STOCK' })
      const regular = createMagentoProduct({ stock_status: 'OUT_OF_STOCK' })

      const result = (productService as unknown as {
        selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => { selected: MagentoProduct | null, isSpecial: boolean }
      }).selectBestVariant(dm, undefined)

      expect(result.selected).toBeNull()
      expect(result.isSpecial).toBe(false)

      const result2 = (productService as unknown as {
        selectBestVariant: (dm?: MagentoProduct, regular?: MagentoProduct) => { selected: MagentoProduct | null, isSpecial: boolean }
      }).selectBestVariant(undefined, regular)

      expect(result2.selected).toBeNull()
      expect(result2.isSpecial).toBe(false)
    })
  })

  describe('getBestVariantForCart', () => {
    beforeEach(() => {
      // Mock the API calls
      vi.stubGlobal('$fetch', vi.fn())
    })

    it('should return DM variant when both are available and DM is in stock', async () => {
      const baseProduct = createProduct({ sku: 'test_sku_pl', amount: 2 })
      const cmsProducts = [createCmsProduct({ sku: 'test_sku_pl' })]
      const magentoProducts = [
        createMagentoProduct({ sku: 'test_sku_pl' }),
        createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, price: 119.99 }),
      ]

      vi.mocked($fetch)
        .mockResolvedValueOnce(cmsProducts)
        .mockResolvedValueOnce(magentoProducts)

      const result = await productService.getBestVariantForCart(baseProduct)

      expect(result).toEqual({
        uid: 'test-1',
        sku: 'test_sku_pl_dm',
        img: 'test.jpg',
        id: 2,
        name: 'Test Product',
        stock_status: 'IN_STOCK',
        price: 119.99,
        amount: 2,
        special: true,
      })
    })

    it('should return regular variant when DM is out of stock', async () => {
      const baseProduct = createProduct({ sku: 'test_sku_pl', amount: 1 })
      const cmsProducts = [createCmsProduct({ sku: 'test_sku_pl' })]
      const magentoProducts = [
        createMagentoProduct({ sku: 'test_sku_pl' }),
        createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, stock_status: 'OUT_OF_STOCK' }),
      ]

      vi.mocked($fetch)
        .mockResolvedValueOnce(cmsProducts)
        .mockResolvedValueOnce(magentoProducts)

      const result = await productService.getBestVariantForCart(baseProduct)

      expect(result).toEqual({
        uid: 'test-1',
        sku: 'test_sku_pl',
        img: 'test.jpg',
        id: 1,
        name: 'Test Product',
        stock_status: 'IN_STOCK',
        price: 99.99,
        amount: 1,
        special: false,
      })
    })

    it('should return null when no CMS product is found', async () => {
      const baseProduct = createProduct({ sku: 'nonexistent_sku' })
      const cmsProducts = [createCmsProduct({ sku: 'other_sku' })]
      const magentoProducts = [createMagentoProduct({ sku: 'other_sku' })]

      vi.mocked($fetch)
        .mockResolvedValueOnce(cmsProducts)
        .mockResolvedValueOnce(magentoProducts)

      const result = await productService.getBestVariantForCart(baseProduct)

      expect(result).toBeNull()
    })

    it('should return null when no variants are in stock', async () => {
      const baseProduct = createProduct({ sku: 'test_sku_pl' })
      const cmsProducts = [createCmsProduct({ sku: 'test_sku_pl' })]
      const magentoProducts = [
        createMagentoProduct({ sku: 'test_sku_pl', stock_status: 'OUT_OF_STOCK' }),
        createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, stock_status: 'OUT_OF_STOCK' }),
      ]

      vi.mocked($fetch)
        .mockResolvedValueOnce(cmsProducts)
        .mockResolvedValueOnce(magentoProducts)

      const result = await productService.getBestVariantForCart(baseProduct)

      expect(result).toBeNull()
    })

    it('should handle base product with _dm suffix correctly', async () => {
      const baseProduct = createProduct({ sku: 'test_sku_pl_dm', amount: 3 })
      const cmsProducts = [createCmsProduct({ sku: 'test_sku_pl' })]
      const magentoProducts = [
        createMagentoProduct({ sku: 'test_sku_pl' }),
        createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, price: 119.99 }),
      ]

      vi.mocked($fetch)
        .mockResolvedValueOnce(cmsProducts)
        .mockResolvedValueOnce(magentoProducts)

      const result = await productService.getBestVariantForCart(baseProduct)

      expect(result).toEqual({
        uid: 'test-1',
        sku: 'test_sku_pl_dm',
        img: 'test.jpg',
        id: 2,
        name: 'Test Product',
        stock_status: 'IN_STOCK',
        price: 119.99,
        amount: 3,
        special: true,
      })
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
        special: false,
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
      expect(result[0].special).toBe(true)
    })

    it('should fallback to regular variant when DM is out of stock', () => {
      const cmsProducts = [createCmsProduct()]
      const magentoProducts = [
        createMagentoProduct(),
        createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, name: 'Test Product DM', price: 119.99, stock_status: 'OUT_OF_STOCK' }),
      ]

      const result = productService.mergeProducts(cmsProducts, magentoProducts)

      expect(result).toHaveLength(1)
      expect(result[0].sku).toBe('test_sku_pl')
      expect(result[0].price).toBe(99.99)
      expect(result[0].special).toBe(false)
    })

    it('should return null when both variants are out of stock', () => {
      const cmsProducts = [createCmsProduct()]
      const magentoProducts = [
        createMagentoProduct({ stock_status: 'OUT_OF_STOCK' }),
        createMagentoProduct({ sku: 'test_sku_pl_dm', id: 2, name: 'Test Product DM', price: 119.99, stock_status: 'OUT_OF_STOCK' }),
      ]

      const result = productService.mergeProducts(cmsProducts, magentoProducts)

      expect(result).toHaveLength(0)
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

    it('should handle multiple CMS products with mixed variants', () => {
      const cmsProducts = [
        createCmsProduct({ uid: 'test-1', sku: 'sku1' }),
        createCmsProduct({ uid: 'test-2', sku: 'sku2' }),
      ]
      const magentoProducts = [
        createMagentoProduct({ sku: 'sku1', id: 1 }),
        createMagentoProduct({ sku: 'sku1_dm', id: 2, stock_status: 'OUT_OF_STOCK' }), // DM out of stock
        createMagentoProduct({ sku: 'sku2', id: 3 }),
        createMagentoProduct({ sku: 'sku2_dm', id: 4 }), // DM in stock
      ]

      const result = productService.mergeProducts(cmsProducts, magentoProducts)

      expect(result).toHaveLength(2)
      expect(result[0].uid).toBe('test-1')
      expect(result[0].sku).toBe('sku1') // Should use regular since DM is out of stock
      expect(result[0].special).toBe(false)
      expect(result[1].uid).toBe('test-2')
      expect(result[1].sku).toBe('sku2_dm') // Should use DM since it's in stock
      expect(result[1].special).toBe(true)
    })

    it('should handle products with only DM variants', () => {
      const cmsProducts = [createCmsProduct({ sku: 'dm_only_sku' })]
      const magentoProducts = [
        createMagentoProduct({ sku: 'dm_only_sku_dm', id: 1, name: 'DM Only Product' }),
      ]

      const result = productService.mergeProducts(cmsProducts, magentoProducts)

      expect(result).toHaveLength(1)
      expect(result[0].sku).toBe('dm_only_sku_dm')
      expect(result[0].special).toBe(true)
    })
  })
})

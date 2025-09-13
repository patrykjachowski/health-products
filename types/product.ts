export type CmsProduct = {
  uid: string
  img: string
  sku: string
}

export type MagentoProduct = {
  sku: string
  id: number
  name: string
  stock_status: 'IN_STOCK' | 'OUT_OF_STOCK'
  price: number
}

export type Product = MagentoProduct & CmsProduct & {
  special: boolean
}

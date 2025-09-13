import type { MagentoProduct } from '~/types/product'

export default defineEventHandler(async (): Promise<MagentoProduct[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    { sku: 'mykids_zinc_pl', id: 532, name: 'MyKids Zinc', stock_status: 'IN_STOCK', price: 89.99 },
    {
      sku: 'newme_pro_age_pl',
      id: 573,
      name: 'NewMe Pro-Age',
      stock_status: 'IN_STOCK',
      price: 129.99,
    },
    {
      sku: 'newme_pro_age_pl_dm',
      id: 673,
      name: 'NewMe Pro-Age DM',
      stock_status: 'OUT_OF_STOCK',
      price: 149.99,
    },
    {
      sku: 'kompleksowe_wsparcie_skory_tradzikowej_pl',
      id: 470,
      name: 'My Acne Solution',
      stock_status: 'IN_STOCK',
      price: 179.99,
    },
    { sku: 'well_me_pl', id: 481, name: 'WellMe', stock_status: 'OUT_OF_STOCK', price: 99.99 },
    { sku: 'well_me_pl_dm', id: 681, name: 'WellMe DM', stock_status: 'IN_STOCK', price: 119.99 },
    {
      sku: 'glow_me_ananas_mango_pl',
      id: 497,
      name: 'GlowMe smak ananas-mango',
      stock_status: 'IN_STOCK',
      price: 69.99,
    },
    {
      sku: 'mykids_nucleo_pl',
      id: 567,
      name: 'MyKids Nucleo',
      stock_status: 'OUT_OF_STOCK',
      price: 79.99,
    },
    {
      sku: 'mykids_nucleo_pl_dm',
      id: 667,
      name: 'MyKids Nucleo DM',
      stock_status: 'OUT_OF_STOCK',
      price: 89.99,
    },
    {
      sku: 'kompleksowe_wsparcie_skory_tradzikowej_pl_dm',
      id: 670,
      name: 'My Acne Solution DM',
      stock_status: 'IN_STOCK',
      price: 199.99,
    },
    { sku: 'nucleo_me_pl', id: 576, name: 'NucleoMe', stock_status: 'IN_STOCK', price: 159.99 },
    { sku: 'nucleo_me_pl_dm', id: 676, name: 'NucleoMe DM', stock_status: 'IN_STOCK', price: 169.99 },
    { sku: 'goody_me_pl_dm', id: 699, name: 'GoodyMe DM', stock_status: 'IN_STOCK', price: 59.99 },
    {
      sku: 'mykids_zinc_pl_dm',
      id: 632,
      name: 'MyKids Zinc DM',
      stock_status: 'IN_STOCK',
      price: 99.99,
    },
    { sku: 'balance_me_pl', id: 300, name: 'BalanceMe', stock_status: 'IN_STOCK', price: 139.99 },
  ]
})

import type { CmsProduct } from '~/types/product'

export default defineEventHandler(async (): Promise<CmsProduct[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    {
      uid: 'my-kids-zinc',
      sku: 'mykids_zinc_pl',
      img: 'https://images.prismic.io/healthlabs/Zl2HjqWtHYXtUAzW_kidszinc1.png',
    },
    {
      uid: 'new-me-pro-age',
      sku: 'newme_pro_age_pl',
      img: 'https://images.prismic.io/healthlabs/ZmIaQ5m069VX1iAE_img_New_Me_Pro-Age.png',
    },
    {
      uid: 'kompleksowe-wsparcie-skory-tradzikowej',
      sku: 'kompleksowe_wsparcie_skory_tradzikowej_pl',
      img: 'https://images.prismic.io/healthlabs/Zpg_3B5LeNNTxP-__Kompleksowewsparciesk%C3%B3rytr%C4%85dzikowej.png',
    },
    {
      uid: 'well-me',
      sku: 'well_me_pl',
      img: 'https://images.prismic.io/healthlabs/Zl2H3qWtHYXtUAzl_wellme1.png',
    },
    {
      uid: 'glow-me-ananas',
      sku: 'glow_me_ananas_mango_pl',
      img: 'https://images.prismic.io/healthlabs/Zn6gOx5LeNNTwn7v_img_GlowMe-ananas_listing.png',
    },
    {
      uid: 'my-kids-nucleo',
      sku: 'mykids_nucleo_pl',
      img: 'https://images.prismic.io/healthlabs/ZmHrdpm069VX1hkN_kidsnucleo1.png',
    },
    {
      uid: 'nucleo-me',
      sku: 'nucleo_me_pl',
      img: 'https://images.prismic.io/healthlabs/ZmHrdpm069VX1hkN_kidsnucleo1.png',
    },
    {
      uid: 'goody-me',
      sku: 'goody_me_pl',
      img: 'https://images.prismic.io/healthlabs/Zl2HaaWtHYXtUAzJ_goody1.png',
    },
    {
      uid: 'balance-me',
      sku: 'balance_me_pl',
      img: 'https://images.prismic.io/healthlabs/Zl2Id6WtHYXtUA0h_balanceme1.png',
    },
  ]
})

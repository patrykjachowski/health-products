// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon',
  ],
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: 'single',
        commaDangle: 'always-multiline',
        indent: 2,
      },
    },
  },
  image: {
    prismic: {
      baseURL: 'https://images.prismic.io',
    },
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  modules: ['@pinia/nuxt', '@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: false,
    },
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'MGNOVENIE — натуральные свечи',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'description', content: 'Натуральные свечи ручной работы из пчелиного воска.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preload', href: '/fonts/manrope-cyrillic-400-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        { rel: 'preload', href: '/fonts/manrope-latin-400-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        { rel: 'preload', href: '/fonts/cormorant-garamond-cyrillic-500-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        { rel: 'preload', href: '/fonts/cormorant-garamond-latin-500-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
      ],
    },
  },
  runtimeConfig: {
    // Override at runtime with NUXT_* env vars (do not bake secrets at build time).
    databaseUrl: '',
    telegramBotToken: '',
    telegramChatId: '',
    tbankTerminalKey: '',
    tbankPassword: '',
    public: {
      siteUrl: 'http://localhost:3000',
    },
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
})

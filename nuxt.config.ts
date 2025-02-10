// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'dayjs-nuxt',
    'nuxt-graphql-request',
  ],
  dayjs: {
    locales: ['zh-cn'],
    defaultLocale: 'zh-cn',
  },
  graphql: {
    clients: {
      default: {
        endpoint: `${process.env.VITE_API_URL}/graphql`,
      },
    },
  },
})

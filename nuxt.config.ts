// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  css: ['~/public/css/buttons.scss'],
  runtimeConfig: {
    public: {
      apiUrl: 'http://94.16.122.175:8000',
    }
  },
})

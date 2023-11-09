// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  css: ['~/public/css/buttons.scss'],
  runtimeConfig: {
    public: {
      apiUrl: 'https://backend.casino.schuelerprojekte.online/',
    }
  },
  app:{
    head:{
      title:"Casino HTL",
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" }
      ]
    }
  }
})

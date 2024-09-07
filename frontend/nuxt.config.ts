// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';
export default defineNuxtConfig({
 runtimeConfig: {
  weatherApiKey: process?.env?.WEATHER_API_KEY || ""
 },

 vite: {
    plugins: [
      svgLoader(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/main.scss";',
        },
      },
    },
  },
 compatibilityDate: '2024-09-03',
})
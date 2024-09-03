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
  },

 compatibilityDate: '2024-09-03',
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 runtimeConfig: {
  weatherApiKey: process?.env?.WEATHER_API_KEY || ""
 }
})

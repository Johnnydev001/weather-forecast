// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
  nitro: {
    output: {
      dir: "output",
      publicDir: "output/public",
      serverDir: "output/server",
    },
  },
  vite: {
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/public/assets/styles/main.scss";',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      VITE_BASE_URL: process.env.VITE_BASE_URL,
      VITE_LOCATION_COORDINATES_URL: process.env.VITE_LOCATION_COORDINATES_URL,
      VITE_LOCATION_QUERY_URL: process.env.VITE_LOCATION_QUERY_URL,
      VITE_ONE_CALL_WEATHER_API_URL: process.env.VITE_ONE_CALL_WEATHER_API_URL,
    },
  },
  compatibilityDate: "2024-09-03",
  modules: ["@nuxt/image", "@nuxt/test-utils/module"],
});

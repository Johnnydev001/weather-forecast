// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
  nitro: {
    output: {
      dir: ".output",
    },
  },
  // nitro: {
  //   prerender: {
  //     routes: [
  //       '/',
  //       '/:location'
  //     ]
  //   }
  // },
  // ssr: true,
  // routeRules: {
  //   '/': { prerender: true },
  //   '/:location': { prerender: true },
  // },
  runtimeConfig: {
    weatherApiKey: process?.env?.WEATHER_API_KEY || "",
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

  compatibilityDate: "2024-09-03",
  modules: ["@nuxt/image", "@nuxt/test-utils/module"],
});

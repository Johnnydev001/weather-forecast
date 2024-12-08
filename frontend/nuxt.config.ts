// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
  nitro: {
    output: {
      dir: ".output",
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

  compatibilityDate: "2024-09-03",
  modules: ["@nuxt/image", "@nuxt/test-utils/module"],
});

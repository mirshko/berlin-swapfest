// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      FATHOM_SITE: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Caprasimo",
        cssVariable: "--font-caprasimo",
        fallbacks: ["Arial Black", "serif"],
        weights: [400],
        styles: ["normal"],
        subsets: ["latin"],
      },
      {
        provider: fontProviders.fontsource(),
        name: "Courier Prime",
        cssVariable: "--font-courier-prime",
        fallbacks: ["Courier New", "Courier", "monospace"],
        weights: [700],
        styles: ["normal"],
        subsets: ["latin"],
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

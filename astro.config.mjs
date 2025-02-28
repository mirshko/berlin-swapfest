// @ts-check
import { defineConfig, envField } from "astro/config";

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
});

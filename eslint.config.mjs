import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  eslintPluginUnicorn.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  ...eslintPluginAstro.configs.all,
  {
    ignores: ["dist", ".astro", "node_modules", "worker-configuration.d.ts"],
  },
  {
    rules: {
      "astro/no-unsafe-inline-scripts": "off",
      "unicorn/name-replacements": "warn",
    },
  },
);

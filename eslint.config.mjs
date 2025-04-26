import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  eslintPluginUnicorn.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  ...eslintPluginAstro.configs.all,
  {
    ignores: ["dist", ".vercel", ".astro", "node_modules"],
  },
);

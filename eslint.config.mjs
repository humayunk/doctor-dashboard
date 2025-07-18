import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import perfectionist from "eslint-plugin-perfectionist";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  globalIgnores([".next/", "dist/"]),
  eslintConfigPrettier,
  perfectionist.configs["recommended-natural"],
  pluginReact.configs.flat.recommended,
  {
    extends: ["js/recommended"],
    files: ["src/**/*.{cjs,js,jsx,mjs}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: { js },
  },
  {
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);

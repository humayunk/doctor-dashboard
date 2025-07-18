import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import perfectionist from "eslint-plugin-perfectionist";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([".next/", "dist/"]),
  eslintConfigPrettier,
  perfectionist.configs["recommended-natural"],
  pluginReact.configs.flat.recommended,
  {
    files: ["src/**/*.{cjs,js,jsx,mjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
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

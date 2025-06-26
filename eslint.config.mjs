import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist/"]),
  pluginReact.configs.flat.recommended,
  {
    files: ["src/**/*.{cjs,js,jsx,mjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    }
  },
  {
    settings: {
      react: {
        version: "detect",
      }
    }
  },
]);

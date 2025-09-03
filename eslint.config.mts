import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  globalIgnores([".react-router/", "build/"]),
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylisticTypeChecked,
  pluginReact.configs.flat.recommended,
  prettierConfig,
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
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
);

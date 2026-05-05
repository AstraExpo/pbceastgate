import js from "@eslint/js";
import ts from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import configPrettier from "eslint-config-prettier";

/**
 * A custom ESLint configuration for TanStack Start / React Vite apps.
 * @type {import("eslint").Linter.Config[]}
 */
export const tanstackConfig = [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: ["Route", "FileRoute", "meta", "links"],
        },
      ],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
    languageOptions: {
      globals: {
        React: "writable",
      },
    },
  },
  configPrettier,
];

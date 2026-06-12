import { tanstackConfig } from "@eastgate/eslint-config/tanstack";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [".output/**", "dist/**", "node_modules/**", ".tanstack/**"],
  },
  ...tanstackConfig,
  {
    // Apply this override to your routing files
    files: ["src/app/**", "app/**"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
];
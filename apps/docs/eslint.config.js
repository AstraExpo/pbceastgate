import { nextJsConfig } from "@eastgate/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [".next/**", "node_modules/**", "dist/**"],
  },
  ...nextJsConfig,
];
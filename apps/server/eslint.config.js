import { nestConfig } from "@eastgate/eslint-config/nest";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    // Global ignores must be in their own object without any other keys
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },
  ...nestConfig,
];
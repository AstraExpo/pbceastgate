import { config } from "@eastgate/eslint-config/base";

export default [
  ...config,
  {
    ignores: ["node_modules/**", "src/generated/**"],
  },
];

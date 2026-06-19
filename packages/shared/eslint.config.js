import { config } from "@eastgate/eslint-config/base";

export default [
  {
    ignores: [
      "node_modules/**",
      "src/generated/**",
      "dist/**",
      ".turbo/**",
      "build/**",
      ".next/**",
    ],
  },
  ...config,
];

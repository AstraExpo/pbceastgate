import { config } from "@eastgate/eslint-config/base";

export default [
  {
    ignores: [
      "node_modules/**",
      "client/**",
      "dist/**",
      ".turbo/**",
      "build/**",
      ".next/**",
      "prisma/**/*",
    ],
  },
  ...config,
];

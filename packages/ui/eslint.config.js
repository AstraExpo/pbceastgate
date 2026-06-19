import { config } from "@eastgate/eslint-config/react-internal";

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

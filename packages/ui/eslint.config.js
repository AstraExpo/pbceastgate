import { config } from "@eastgate/eslint-config/react-internal";

export default [
  ...config,
  {
    ignores: ["node_modules/**", "src/generated/**"],
  },
];

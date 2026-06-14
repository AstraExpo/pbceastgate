import baseConfig from "@eastgate/eslint-config/base";

export default [
  ...baseConfig,
  {
    ignores: ["node_modules/**", "src/generated/**"],
  },
];

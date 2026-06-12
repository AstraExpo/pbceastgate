import baseConfig from "@eastgate/eslint-config/base";

export default [
  ...baseConfig,
  {
    ignores: ["src/generated/**"]
  }
];
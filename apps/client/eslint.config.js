import { tanstackConfig } from "@eastgate/eslint-config/tanstack";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [
      ".output/**",
      "dist/**",
      "node_modules/**",
      "src/graphql/generated/**/*",
      ".tanstack/**",
    ],
  },
  ...tanstackConfig,
  {
    files: ["src/app/**", "app/**"],
    rules: {
      "react-refresh/only-export-components": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@eastgate/auth/admin",
              message:
                "Admin SDK is server-only. Import it inside src/server/** files (server functions), never in routes, components, or hooks.",
            },
          ],
        },
      ],
      "no-restricted-globals": [
        "error",
        {
          name: "process",
          message: "process is server-only — restrict usage to src/server/**.",
        },
        {
          name: "Buffer",
          message: "Buffer is server-only — restrict usage to src/server/**.",
        },
      ],
    },
    overrides: [
      {
        files: ["src/server/**"],
        rules: { "no-restricted-globals": "off" },
      },
    ],
  },
];

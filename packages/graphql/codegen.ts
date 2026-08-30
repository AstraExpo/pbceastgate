import { join } from "node:path";
import process from "node:process";
import type { CodegenConfig } from "@graphql-codegen/cli";

const rootDir = process.cwd();

const apolloConfig = {
  client: join(
    rootDir,
    "../../apps/client/src/graphql/generated/client.graphql.ts",
  ),
  client_types: join(
    rootDir,
    "../../apps/client/src/graphql/generated/client.types.ts",
  ),
  admin: join(
    rootDir,
    "../../apps/admin/src/graphql/generated/admin.graphql.ts",
  ),
  admin_types: join(
    rootDir,
    "../../apps/admin/src/graphql/generated/admin.types.ts",
  ),
  server: join(
    rootDir,
    "../../apps/server/src/common/graphql/generated/server.types.ts",
  ),
};

const schema = join(rootDir, "../../apps/server/src/common/graphql/schema.gql");

const scalars = {
  Date: "string",
  DateTime: "string",
  JSON: "{ [key: string]: unknown }",
  UUID: "string",
};

const config: CodegenConfig = {
  schema,
  generates: {
    [apolloConfig.client_types]: {
      plugins: ["typescript"],
      config: { scalars },
    },

    [apolloConfig.client]: {
      documents: join(
        rootDir,
        "../../apps/client/src/graphql/operations/**/*.graphql",
      ),
      plugins: ["typescript-operations", "typed-document-node"],
      config: {
        scalars,
        nonOptionalTypename: true,
        documentMode: "documentNode",
      },
    },

    [apolloConfig.admin_types]: {
      plugins: ["typescript"],
      config: { scalars },
    },

    [apolloConfig.admin]: {
      documents: join(
        rootDir,
        "../../apps/admin/src/graphql/operations/**/*.graphql",
      ),
      plugins: ["typescript-operations", "typed-document-node"],
      config: {
        scalars,
        nonOptionalTypename: true,
        documentMode: "documentNode",
      },
    },

    [apolloConfig.server]: {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        scalars,
        useIndexSignature: true,
      },
    },
  },
};

export default config;

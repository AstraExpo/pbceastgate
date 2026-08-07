import { join } from "node:path";
import { CodegenConfig } from "@graphql-codegen/cli";
import process from "node:process";

const rootDir = process.cwd();

const apolloConfig = {
  client: join(
    rootDir,
    "../../apps/client/src/graphql/generated/apollo.types.ts",
  ),
  admin: join(
    rootDir,
    "../../apps/admin/src/graphql/generated/apollo.types.ts",
  ),
  server: join(
    rootDir,
    "../../apps/server/src/common/graphql/generated/apollo.types.ts",
  ),
};

const sharedReactApolloConfig = {
  apolloReactCommonImportFrom: "@apollo/client/react",
  apolloReactHooksImportFrom: "@apollo/client/react",
  apolloClientVersion: 4,
  reactApolloVersion: 4,
  nonOptionalTypename: true,
  skipTypeNameForRoot: true,
  withComponent: false,
  withHOC: false,
  withHooks: true,
};

const config: CodegenConfig = {
  schema: join(rootDir, "../../apps/server/src/common/graphql/schema.gql"),
  config: {
    scalars: {
      Date: "string",
      DateTime: "string",
      JSON: "{ [key: string]: any }",
      UUID: "string",
    },
  },
  generates: {
    [apolloConfig.client]: {
      documents: join(
        rootDir,
        "../../apps/client/src/graphql/operations/**/*.graphql",
      ),
      plugins: [
        { add: { content: "// @ts-nocheck\n" } },
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: sharedReactApolloConfig,
    },

    [apolloConfig.admin]: {
      documents: join(
        rootDir,
        "../../apps/admin/src/graphql/operations/**/*.graphql",
      ),
      plugins: [
        { add: { content: "// @ts-nocheck\n" } },
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: sharedReactApolloConfig,
    },

    [apolloConfig.server]: {
      plugins: ["typescript"],
    },
  },
};

export default config;

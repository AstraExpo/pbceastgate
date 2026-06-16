import { join } from 'node:path';
import { CodegenConfig } from '@graphql-codegen/cli';
import process from 'node:process';

const rootDir = process.cwd();

const apolloConfig = {
  client: join(rootDir, '../../apps/client/src/graphql/generated/apollo.types.ts'),
  admin: join(rootDir, '../../apps/admin/src/graphql/generated/apollo.types.ts'),
  server: join(rootDir, '../../apps/server/src/common/graphql/generated/apollo.types.ts'),
};

const sharedReactApolloConfig = {
  apolloClientVersion: 4,
  apolloReactHooksImportFrom: '@apollo/client/react',
  reactApolloVersion: 4,
  useTypeImports: true,
  withComponent: false,
  withHOC: false,
  withHooks: true,
};

const config: CodegenConfig = {
  // Source Schema from the NestJS application backend
  schema: join(rootDir, '../../apps/server/src/common/graphql/schema.gql'),
  config: {
    scalars: {
      Date: 'string',
      DateTime: 'string',
      JSON: '{ [key: string]: any }',
      UUID: 'string',
    },
  },
  generates: {
    // 1. Client Application Target (Apollo Client 4 Hooks)
    [apolloConfig.client]: {
      documents: join(rootDir, '../../apps/client/src/graphql/operations/**/*.graphql'),
      plugins: [
        { add: { content: '// @ts-nocheck\n' } },
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: sharedReactApolloConfig,
    },

    // 2. Admin Application Target (Apollo Client 4 Hooks)
    [apolloConfig.admin]: {
      documents: join(rootDir, '../../apps/admin/src/graphql/operations/**/*.graphql'),
      plugins: [
        { add: { content: '// @ts-nocheck\n' } },
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: sharedReactApolloConfig,
    },

    // 3. Server-to-Server Target (GraphQL Request Fetcher)
    [apolloConfig.server]: {
      documents: [
        join(rootDir, '../../apps/client/src/graphql/operations/**/*.graphql'),
        join(rootDir, '../../apps/admin/src/graphql/operations/**/*.graphql'),
      ],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        fetcher: 'graphql-request',
        documentMode: 'string',
      },
    },
  },
};

export default config;
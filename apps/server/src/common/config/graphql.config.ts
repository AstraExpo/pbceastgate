import { join } from "node:path";
import { ApolloDriverConfig } from "@nestjs/apollo";
import depthLimit from "graphql-depth-limit";
import { Request, Response } from "express";
import { AppConfigService } from "../config/app-config.service";

export interface GraphQLContext {
  req: Request;
  res: Response;
}

export function createGraphQLConfig(
  configService: AppConfigService,
): ApolloDriverConfig {
  return {
    autoSchemaFile: configService.isDevelopment
      ? join(process.cwd(), "src/common/graphql/schema.gql")
      : true,
    sortSchema: true,
    context: ({
      req,
      res,
    }: {
      req: Request;
      res: Response;
    }): GraphQLContext => ({
      req,
      res,
    }),
    csrfPrevention: true,
    debug: !configService.isProduction,
    introspection: !configService.isProduction,
    playground: false,
    subscriptions: {
      "graphql-ws": {
        path: "/graphql",
      },
    },
    validationRules: [depthLimit(14)],
    formatError: formattedError => {
      return formattedError;
    },
  };
}

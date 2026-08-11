import { join } from "node:path";
import { ApolloDriverConfig } from "@nestjs/apollo";
import depthLimit from "graphql-depth-limit";
import { Request, Response } from "express";
import { AppConfigService } from "../config/app-config.service";

export interface GraphQLContext {
  req: Request;
  res: Response;
}

interface OriginalError {
  statusCode?: number;
  message?: string | string[];
  error?: string;
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
    formatError: error => {
      const originalError = error.extensions?.originalError as
        OriginalError | undefined;
      return {
        message: originalError?.message
          ? Array.isArray(originalError.message)
            ? originalError.message.join(", ")
            : originalError.message
          : error.message,
        extensions: {
          code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
          statusCode: originalError?.statusCode || 500,
        },
      };
    },
  };
}

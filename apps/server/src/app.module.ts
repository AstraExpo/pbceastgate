import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ThrottlerModule } from "@nestjs/throttler";
import depthLimit from "graphql-depth-limit";
import { Request, Response } from "express";

import { ServiceModule } from "./service/service.module.js";
import { CommonModule } from "./common/common.module.js";
import { ServerEnv } from "./common/config/env.config.js";

export interface GraphQLContext {
  req: Request;
  res: Response;
}

interface OriginalError {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

@Module({
  imports: [
    // Initialize global configuration resolution
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    // Implement asymmetric multi-tier rate limiting
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ServerEnv, true>) => [
        {
          name: "short",
          ttl: Number(configService.get("THROTTLE_TTL", { infer: true })),
          limit: Number(configService.get("THROTTLE_LIMIT", { infer: true })),
        },
        {
          name: "medium",
          ttl: Number(
            configService.get("THROTTLE_MEDIUM_TTL", { infer: true }),
          ),
          limit: Number(
            configService.get("THROTTLE_MEDIUM_LIMIT", { infer: true }),
          ),
        },
        {
          name: "long",
          ttl: Number(configService.get("THROTTLE_LONG_TTL", { infer: true })),
          limit: Number(
            configService.get("THROTTLE_LONG_LIMIT", { infer: true }),
          ),
        },
      ],
    }),

    // Construct the production-grade Apollo Driver configuration
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ServerEnv, true>) => ({
        // Dynamic file output: builds to disk in dev only; runs purely in-memory elsewhere
        autoSchemaFile:
          configService.get("APP_ENV", { infer: true }) === "development"
            ? join(process.cwd(), "src/common/graphql/schema.gql")
            : true,

        sortSchema: true,
        context: ({
          req,
          res,
        }: {
          req: Request;
          res: Response;
        }): GraphQLContext => ({ req, res }),
        csrfPrevention: true,
        debug: configService.get("APP_ENV", { infer: true }) !== "production",
        introspection:
          configService.get("APP_ENV", { infer: true }) !== "production",
        playground: false, // Force disabled in favor of sandboxed landing page

        // Map data integrity scalars across the runtime engine
        // Disabled due to the fact that I don't have any resolvers that apply these scalers yet
        // resolvers: { JSON: GraphQLJSON, UUID: GraphQLUUID },

        // Real-time protocol pipeline configurations
        subscriptions: {
          "graphql-ws": {
            keepAlive: 60000,
            lazyCloseTimeout: 5000,
            path: "/graphql",
          },
        },

        // Prevent DoS nesting resource-drain exploits
        validationRules: [depthLimit(14)],

        formatError: (error) => {
          const originalError = error.extensions?.originalError as
            | OriginalError
            | undefined;
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
      }),
    }),
    ServiceModule,
    CommonModule,
  ],
})
export class AppModule {}

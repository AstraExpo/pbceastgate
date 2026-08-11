import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ThrottlerModule } from "@nestjs/throttler";
import { ServiceModule } from "./service/service.module";
import { CommonModule } from "./common/common.module";
import { APP_GUARD } from "@nestjs/core";
import { FirebaseAuthGuard } from "./service/auth/guard/firebase-auth.guard";
import { validate } from "./common/config/env.validate";
import { createGraphQLConfig } from "./common/config/graphql.config";
import { AppConfigService } from "./common/config/app-config.service";
import { createThrottlerConfig } from "./common/config/throttler.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate,
    }),
    CommonModule,

    ThrottlerModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: createThrottlerConfig,
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [AppConfigService],
      useFactory: createGraphQLConfig,
    }),
    ServiceModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
  ],
})
export class AppModule {}

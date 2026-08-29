import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ThrottlerModule } from "@nestjs/throttler";
import { ServiceModule } from "./service/service.module";
import { CommonModule } from "./common/common.module";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { FirebaseGuard } from "./service/auth/guard/firebase.guard";
import { validate } from "./common/config/env.validate";
import { createGraphQLConfig } from "./common/config/graphql.config";
import { AppConfigService } from "./common/config/app-config.service";
import { createThrottlerConfig } from "./common/config/throttler.config";
import { RolesGuard } from "./service/auth/guard/roles.guard";
import { AllExceptionsFilter } from "./common/filters/allException.errors.filters";
import { AuthGuard } from "./service/auth/guard/auth.guard";

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
      useClass: FirebaseGuard,
    },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}

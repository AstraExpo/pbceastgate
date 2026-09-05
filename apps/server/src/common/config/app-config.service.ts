import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables, Environment } from "./env.validate";

@Injectable()
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  get appEnv(): Environment {
    return this.configService.get("APP_ENV", { infer: true });
  }

  get isProduction(): boolean {
    return this.appEnv === Environment.Production;
  }

  get isDevelopment(): boolean {
    return this.appEnv === Environment.Development;
  }

  get throttle() {
    return {
      short: {
        ttl: this.configService.get("THROTTLE_TTL", { infer: true }),
        limit: this.configService.get("THROTTLE_LIMIT", { infer: true }),
      },
      medium: {
        ttl: this.configService.get("THROTTLE_MEDIUM_TTL", { infer: true }),
        limit: this.configService.get("THROTTLE_MEDIUM_LIMIT", { infer: true }),
      },
      long: {
        ttl: this.configService.get("THROTTLE_LONG_TTL", { infer: true }),
        limit: this.configService.get("THROTTLE_LONG_LIMIT", { infer: true }),
      },
    };
  }

  get databaseUrl(): string {
    return this.configService.get("DATABASE_URL", { infer: true });
  }

  get firebase() {
    return {
      projectId: this.configService.get("FIREBASE_PROJECT_ID", { infer: true }),
      clientEmail: this.configService.get("FIREBASE_CLIENT_EMAIL", {
        infer: true,
      }),
      privateKey: this.configService.get("FIREBASE_PRIVATE_KEY", {
        infer: true,
      }),
    };
  }

  get allowedOrigins(): string[] {
    const raw = this.configService.get("ALLOWED_ORIGINS", { infer: true });
    return raw ? raw.split(",") : [];
  }
}

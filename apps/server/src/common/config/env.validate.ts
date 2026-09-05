import { plainToInstance } from "class-transformer";
import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";

export enum Environment {
  Development = "development",
  Staging = "staging",
  Production = "production",
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  APP_ENV!: Environment;

  @IsNumber()
  THROTTLE_TTL!: number;

  @IsNumber()
  THROTTLE_LIMIT!: number;

  @IsNumber()
  THROTTLE_MEDIUM_TTL!: number;

  @IsNumber()
  THROTTLE_MEDIUM_LIMIT!: number;

  @IsNumber()
  THROTTLE_LONG_TTL!: number;

  @IsNumber()
  THROTTLE_LONG_LIMIT!: number;

  @IsString()
  FIREBASE_PROJECT_ID!: string;

  @IsString()
  FIREBASE_CLIENT_EMAIL!: string;

  @IsString()
  FIREBASE_PRIVATE_KEY!: string;

  @IsString()
  ALLOWED_ORIGINS!: string;

  @IsString()
  DATABASE_URL!: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`Environment validation failed: ${errors.toString()}`);
  }
  return validatedConfig;
}

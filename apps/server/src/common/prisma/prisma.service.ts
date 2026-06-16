import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@eastgate/database"; // Imports the class blueprint
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    const databaseUrl = configService.getOrThrow<string>("DATABASE_URL");
    const connectionLimit =
      configService.get<string>("DATABASE_CONNECTION_LIMIT") || "10";
    const idleTimeout =
      configService.get<string>("DATABASE_IDLE_TIMEOUT") || "30000";

    // Build an isolated, discrete Node-Postgres connection pool managed by the NestJS lifecycle
    const pool = new pg.Pool({
      connectionString: databaseUrl,
      max: Number(connectionLimit),
      idleTimeoutMillis: Number(idleTimeout),
    });

    const adapter = new PrismaPg(pool);

    // Pass the built JavaScript driver adapter directly into the base PrismaClient class constructor
    super({
      adapter,
      log:
        configService.get<string>("NODE_ENV") === "development"
          ? ["query", "info", "warn", "error"]
          : ["error"],
    });

    this.logger.log(
      `Database connection instance constructed via PrismaPg Driver Adapter. Pool Max: ${connectionLimit}`,
    );
  }

  async onModuleInit() {
    // Triggers the driver adapter connection sequence on application bootstrap
    await this.$connect();
    this.logger.log("Successfully connected to the database instance.");
  }

  async onModuleDestroy() {
    // Ensures clean process exit and prevents socket leaks by dropping the connections gracefully
    await this.$disconnect();
    this.logger.log("Database connection channel closed cleanly.");
  }
}

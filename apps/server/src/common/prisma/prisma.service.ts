import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from "@nestjs/common";
import { prisma } from "@eastgate/database";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // Instantiate the NestJS infrastructure logger namespace
  private readonly logger = new Logger("PrismaService");
  public readonly client = prisma;

  async onModuleInit() {
    try {
      // Attempt a real hand-shake connection verification query
      await this.client.$connect();

      // Execute a lightweight query to ensure the database engine responds
      await this.client.$executeRawUnsafe("SELECT 1;");

      this.logger.log(
        "Successfully connected to the PostgreSQL database instance.",
      );
    } catch (error) {
      this.logger.error(
        "Failed to establish a database connection pool.",
        error,
      );
      process.exit(1); // Force crash the application if infrastructure is down
    }
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
    this.logger.log("Database connection pool closed gracefully.");
  }
}

import { prisma } from "@eastgate/database";
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from "@nestjs/common";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  public user = prisma.user;
  public ministry = prisma.ministry;

  async onModuleInit() {
    try {
      await prisma.$connect();

      await prisma.$queryRaw`SELECT 1`;

      this.logger.log("Database connection successfully established 🟢");
    } catch (error) {
      this.logger.error("Failed to connect to the database 🔴", error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
    this.logger.log("Database connection closed gracefully.");
  }
}

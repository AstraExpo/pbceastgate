import { Global, Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AppConfigModule } from "./config/app-config.module";

@Global()
@Module({
  imports: [AppConfigModule, PrismaModule],
  exports: [AppConfigModule, PrismaModule],
})
export class CommonModule {}

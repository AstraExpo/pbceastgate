import { Module } from "@nestjs/common";
import { SermonModule } from "./sermon/sermon.module";
import { MinistryModule } from "./ministry/ministry.module";
import { AuthModule } from "./auth/auth.module";
@Module({
  imports: [SermonModule, MinistryModule, AuthModule],
  providers: [],
})
export class ServiceModule {}

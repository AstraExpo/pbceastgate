import { Module } from "@nestjs/common";
import { SermonModule } from "./sermon/sermon.module";
import { MinistryModule } from "./ministry/ministry.module";
@Module({
  imports: [SermonModule, MinistryModule],
  providers: [],
})
export class ServiceModule {}

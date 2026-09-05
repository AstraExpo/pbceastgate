import { Module } from "@nestjs/common";
import { MinistryService } from "./ministry.service";
import { MinistryResolver } from "./ministry.resolver";

@Module({
  providers: [MinistryService, MinistryResolver],
})
export class MinistryModule {}

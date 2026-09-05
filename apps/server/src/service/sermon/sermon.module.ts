import { Module } from "@nestjs/common";
import { SermonsResolver } from "./sermon.resolver";

@Module({
  imports: [],
  providers: [SermonsResolver],
})
export class SermonModule {}

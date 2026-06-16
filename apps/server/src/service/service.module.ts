import { Module } from '@nestjs/common';
import { SermonModule } from './sermon/sermon.module.js';
import { MinistryModule } from './ministry/ministry.module.js';
@Module({
  imports: [
    SermonModule,
    MinistryModule
  ],
  providers: [
  ],
})
export class ServiceModule {}
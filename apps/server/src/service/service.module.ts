import { Module } from '@nestjs/common';
import { SermonModule } from './sermon/sermon.module.js';
@Module({
  imports: [
    SermonModule
  ],
  providers: [
  ],
})
export class ServiceModule {}
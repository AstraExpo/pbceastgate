import { Module } from '@nestjs/common';
import { MinistryService } from './ministry.service.js';
import { MinistryResolver } from './ministry.resolver.js';

@Module({
  providers: [MinistryService, MinistryResolver],
})
export class MinistryModule {}
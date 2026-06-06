import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export it so other modules inherit the provider
})
export class CommonModule {}
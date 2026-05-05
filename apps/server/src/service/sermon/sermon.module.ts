import { Module } from '@nestjs/common'
import { SermonsResolver } from './sermon.resolver.js'

@Module({
  imports: [

  ],
  providers: [SermonsResolver],
})
export class SermonModule {}
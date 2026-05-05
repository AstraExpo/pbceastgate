import { Query, Resolver } from '@nestjs/graphql'
import {Sermon} from '../../common/entity/sermon.js'
@Resolver(() => Sermon)
export class SermonsResolver {
  @Query(() => [Sermon], { name: 'sermons' })
  async getSermons(): Promise<Sermon[]> {
    return [
      {
        id: '1',
        title: 'Faith over Fear',
        preacher: 'Pastor John Doe',
        date: '2026-05-03',
        videoUrl: 'https://youtube.com/watch?v=xyz',
      },
    ]
  }
}
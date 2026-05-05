import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Sermon {
  @Field(() => ID)
  id!: string

  @Field()
  title!: string

  @Field()
  preacher!: string

  @Field()
  date!: string

  @Field({ nullable: true })
  videoUrl?: string
}
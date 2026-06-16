import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Ministry {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Int, { nullable: true })
  headId!: number | null;
}
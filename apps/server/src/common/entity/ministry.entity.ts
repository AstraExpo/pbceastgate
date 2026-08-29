import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Ministry {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  headId!: number | null;
}

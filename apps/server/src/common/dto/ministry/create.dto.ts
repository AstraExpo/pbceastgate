import { Field, InputType, Int } from "@nestjs/graphql";
import { IsOptional, IsString, IsInt } from "class-validator";

@InputType()
export class CreateMinistryInput {
  @IsString()
  @Field(() => String)
  name!: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  headId?: number;
}

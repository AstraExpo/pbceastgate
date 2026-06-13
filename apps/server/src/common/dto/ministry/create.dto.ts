import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, IsNumber } from "class-validator";

@InputType()
export class CreateMinistryInput {
  @IsString()
  @Field(() => String)
  name!: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsNumber()
  @IsString()
  @Field(() => Number, { nullable: true })
  headId?: number;
}

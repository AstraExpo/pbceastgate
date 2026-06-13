import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsString, IsNumber } from "class-validator";
import { CreateMinistryInput } from "./create.dto.js";

@InputType()
export class UpdateMinistryInput extends PartialType(CreateMinistryInput) {
  @IsNumber()
  @IsString()
  @Field(() => Number)
 id!: number;
}
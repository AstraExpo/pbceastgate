import { IsString, IsOptional } from "class-validator";
import { CreateUserInput } from "./create.dto";
import { InputType, PartialType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  image?: string;
}

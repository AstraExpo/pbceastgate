import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsOptional, IsArray } from "class-validator";

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field(() => [String])
  @IsString()
  @IsArray({ each: true })
  avatarUrls!: string[];

  @Field(() => [String])
  @IsString()
  @IsArray({ each: true })
  backgroundUrls!: string[];

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}

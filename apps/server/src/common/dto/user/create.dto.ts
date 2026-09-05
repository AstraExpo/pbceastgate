import {
  MembershipStatus,
  SystemRole,
} from "@/common/graphql/generated/apollo.types";
import { InputType, Field } from "@nestjs/graphql";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from "class-validator";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  firebaseUid!: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  image?: string;

  @Field(() => String, { defaultValue: SystemRole.User, nullable: true })
  @IsEnum(SystemRole)
  @IsOptional()
  systemRole?: SystemRole;

  @Field(() => String, { defaultValue: MembershipStatus.Guest, nullable: true })
  @IsEnum(MembershipStatus)
  @IsOptional()
  membershipStatus?: MembershipStatus;
}

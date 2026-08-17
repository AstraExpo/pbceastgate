import { MembershipStatus, SystemRole } from "@/generated/prisma/enums";
import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";

registerEnumType(SystemRole, {
  name: "SystemRole",
});

registerEnumType(MembershipStatus, {
  name: "MembershipStatus",
});

@ObjectType()
export class User {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  firebaseUid!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => Boolean)
  emailVerified!: boolean;

  @Field(() => Boolean)
  banned!: boolean;

  @Field(() => String, { nullable: true })
  banReason?: string | null;

  @Field(() => Date, { nullable: true })
  banExpires?: Date | null;

  @Field(() => SystemRole)
  systemRole!: SystemRole;

  @Field(() => MembershipStatus)
  membershipStatus!: MembershipStatus;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

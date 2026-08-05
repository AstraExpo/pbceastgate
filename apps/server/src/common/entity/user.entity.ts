import { MembershipStatus, SystemRole } from "@eastgate/database";
import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";
import { GraphQLUUID } from "graphql-scalars";

registerEnumType(SystemRole, {
  name: "SystemRole",
  description: "The system access level of the user",
});

registerEnumType(MembershipStatus, {
  name: "MembershipStatus",
  description: "The church membership status of the user",
});

@ObjectType({ description: "The core user entity" })
export class User {
  @Field(() => GraphQLUUID, { description: "Public facing UUID" })
  id!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Boolean)
  emailVerified!: boolean;

  @Field(() => Boolean)
  banned!: boolean;

  @Field(() => String, { nullable: true })
  banReason?: string;

  @Field(() => Date, { nullable: true })
  banExpires?: Date;

  @Field(() => SystemRole)
  systemRole!: SystemRole;

  @Field(() => MembershipStatus)
  membershipStatus!: MembershipStatus;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

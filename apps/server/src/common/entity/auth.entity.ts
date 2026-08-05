import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "./user.entity";

@ObjectType()
export class AuthResponse {
  @Field(() => String, { description: "The JWT access token" })
  accessToken!: string;

  @Field(() => User, { description: "The authenticated user profile" })
  user!: User;
}

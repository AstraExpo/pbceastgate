import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";
import { User } from "./user.entity";

export enum AuthStatus {
  Authenticated,
  UnAuthenticated,
}

registerEnumType(AuthStatus, {
  name: "AuthStatus",
});

@ObjectType()
export class AuthStatusResponse {
  @Field(() => AuthStatus)
  status!: AuthStatus;

  @Field(() => User, { nullable: true })
  user?: User | null;
}

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  accessToken!: string;

  @Field(() => User)
  user!: User;
}

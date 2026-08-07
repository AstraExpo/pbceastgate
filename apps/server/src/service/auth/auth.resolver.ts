import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "@/common/entity/user.entity";
import { RequireRoles } from "./decorators/roles.decorators";
import { SystemRole } from "@/common/graphql/generated/apollo.types";
import { Public } from "./decorators/public.decorators";
import { CurrentUser } from "./decorators/user.decorators";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  @RequireRoles(SystemRole.Admin, SystemRole.System, SystemRole.Editor)
  async authenticateAdmin(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => User)
  async authenticateUsers(@CurrentUser() user: User) {
    return user;
  }

  @Public()
  @Mutation(() => User)
  async signUpUser(@Args("firebaseToken") firebaseToken: string) {
    return this.authService.signUpNewUser(firebaseToken);
  }
}

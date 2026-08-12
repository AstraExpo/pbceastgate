import { Resolver, Mutation } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "@/common/entity/user.entity";
import { RequireRoles } from "./decorators/roles.decorators";
import { SystemRole } from "@/common/graphql/generated/apollo.types";
import { Public } from "./decorators/public.decorators";
import { CurrentUser } from "./decorators/user.decorators";
import { CurrentFirebaseUser } from "./decorators/firebase-user.decorator";
import { type DecodedIdToken } from "firebase-admin/auth";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  @RequireRoles(SystemRole.Admin, SystemRole.System, SystemRole.Editor)
  async authenticateAdmin(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => User)
  async authenticateCongregant(@CurrentUser() user: User) {
    return user;
  }

  @Public()
  @Mutation(() => User)
  async signUpCongregant(@CurrentFirebaseUser() firebaseUser: DecodedIdToken) {
    return this.authService.signUpNewCongregant(firebaseUser);
  }
}

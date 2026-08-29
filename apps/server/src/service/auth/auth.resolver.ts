import { Resolver, Mutation, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "@/common/entity/user.entity";
import { RequireRoles } from "./decorators/roles.decorators";
import { Public } from "./decorators/public.decorators";
import { CurrentUser } from "./decorators/user.decorators";
import { CurrentFirebaseUser } from "./decorators/firebase-user.decorator";
import { type DecodedIdToken } from "firebase-admin/auth";
import { AuthStatus, AuthStatusResponse } from "@/common/entity/auth.entity";
import { SystemRole } from "@/generated/prisma/enums";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Query(() => AuthStatusResponse)
  async currentCongregant(
    @CurrentUser() user: User | null,
  ): Promise<AuthStatusResponse> {
    return user
      ? { status: AuthStatus.Authenticated, user }
      : { status: AuthStatus.UnAuthenticated, user: null };
  }

  @Public()
  @Query(() => AuthStatusResponse)
  async currentAdmin(
    @CurrentUser() user: User | null,
  ): Promise<AuthStatusResponse> {
    const allowedRoles: SystemRole[] = [
      SystemRole.Admin,
      SystemRole.System,
      SystemRole.Editor,
    ];
    const isAllowed = !!user && allowedRoles.includes(user.systemRole);

    return isAllowed
      ? { status: AuthStatus.Authenticated, user }
      : { status: AuthStatus.UnAuthenticated, user: null };
  }

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

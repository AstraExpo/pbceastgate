import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SystemRole } from "@/common/graphql/generated/apollo.types";
import { ROLES_KEY } from "../decorators/roles.decorators";
import { isPublicRoute } from "@/common/utils/isPublic.metadata.utils";
import { getGqlRequest } from "@/common/utils/gql.context.utils";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = isPublicRoute(this.reflector, context);
    const req = getGqlRequest(context);

    const user = req.user;
    if (!user) {
      return !!isPublic;
    }
    if (!user.systemRole) {
      if (isPublic) return true;
      throw new ForbiddenException("Your account has no assigned role yet.");
    }
    const requiredRoles = this.reflector.getAllAndOverride<SystemRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;
    if (!requiredRoles.includes(user.systemRole)) {
      throw new ForbiddenException(
        "You do not have permission to perform this action.",
      );
    }
    return true;
  }
}

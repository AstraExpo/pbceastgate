import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { isPublicRoute } from "@/common/utils/isPublic.metadata.utils";
import { getGqlRequest } from "@/common/utils/gql.context.utils";
import { PrismaService } from "@/common/prisma/prisma.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private prismaService: PrismaService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = isPublicRoute(this.reflector, context);
    const req = getGqlRequest(context);

    if (!req.firebaseUser) {
      req.user = null;
      return !!isPublic;
    }
    const dbUser = await this.prismaService.user.findUnique({
      where: {
        firebaseUid: req.firebaseUser.uid,
      },
    });
    req.user = dbUser ?? null;
    if (!dbUser && !isPublic) {
      throw new UnauthorizedException(
        "No matching account found. Please complete sign-up.",
      );
    }
    return true;
  }
}

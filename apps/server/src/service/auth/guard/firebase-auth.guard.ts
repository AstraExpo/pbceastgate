import { PrismaService } from "@/common/prisma/prisma.service";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { getAuth } from "firebase-admin/auth";
import { IS_PUBLIC_KEY } from "../decorators/public.decorators";
import { Request } from "express";

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private prismaService: PrismaService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const gqlContext = GqlExecutionContext.create(context);

    const { req } = gqlContext.getContext<{
      req: Request;
    }>();

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      req.auth = {
        authenticated: false,
        firebaseUser: null,
        user: null,
        method: "anonymous",
      };

      req.firebaseUser = null;
      req.user = null;

      if (isPublic) {
        return true;
      }

      throw new UnauthorizedException("No authorization token provided");
    }

    const token = authHeader.slice(7);

    const decodedToken = await getAuth()
      .verifyIdToken(token)
      .catch(() => null);

    if (!decodedToken) {
      req.auth = {
        authenticated: false,
        firebaseUser: null,
        user: null,
        method: "anonymous",
      };

      req.firebaseUser = null;
      req.user = null;

      if (isPublic) {
        return true;
      }

      throw new UnauthorizedException("Invalid or expired token");
    }

    const dbUser = await this.prismaService.user.findUnique({
      where: {
        firebaseUid: decodedToken.uid,
      },
    });

    req.firebaseUser = decodedToken;
    req.user = dbUser ?? null;

    req.auth = {
      authenticated: true,
      firebaseUser: decodedToken,
      user: dbUser ?? null,
      method: "bearer",
    };

    if (!dbUser && !isPublic) {
      throw new UnauthorizedException(
        "No matching account found. Please complete sign-up.",
      );
    }

    return true;
  }
}

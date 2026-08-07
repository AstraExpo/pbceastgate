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

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authHeader = req.headers["authorization"];

    if (isPublic && (!authHeader || !authHeader.startsWith("Bearer "))) {
      req.user = null;
      return true;
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("No authorization token provided");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = await getAuth().verifyIdToken(token);

      const dbUser = await this.prismaService.user.findUnique({
        where: { firebaseUid: decodedToken.uid },
      });

      if (!dbUser) {
        await getAuth().deleteUser(decodedToken.uid);
        throw new UnauthorizedException(
          "Access denied. Rogue account removed.",
        );
      }

      req.user = dbUser;
      return true;
    } catch (error) {
      throw new UnauthorizedException(`Invalid or expired token: ${error}`);
    }
  }
}

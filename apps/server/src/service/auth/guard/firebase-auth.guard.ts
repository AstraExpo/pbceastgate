import { PrismaService } from "@/common/prisma/prisma.service";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { getAuth } from "firebase-admin/auth";

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("No authorization token provided");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = await getAuth().verifyIdToken(token);

      const dbUser = await this.prisma.user.findUnique({
        where: { id: decodedToken.uid },
      });

      if (!dbUser) {
        throw new UnauthorizedException("User record not found in database.");
      }

      req.user = dbUser;
      return true;
    } catch (error) {
      throw new UnauthorizedException(`Invalid or expired token: ${error}`);
    }
  }
}

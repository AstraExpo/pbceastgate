import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { getAuth } from "firebase-admin/auth";
import { isPublicRoute } from "@/common/utils/isPublic.metadata.utils";
import { getGqlRequest } from "@/common/utils/gql.context.utils";

@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = isPublicRoute(this.reflector, context);
    const req = getGqlRequest(context);
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      req.firebaseUser = null;
      if (isPublic) return true;
      throw new UnauthorizedException("No authorization token provided");
    }
    const token = authHeader.slice(7);
    const decodedToken = await getAuth()
      .verifyIdToken(token)
      .catch(() =>
        getAuth()
          .verifySessionCookie(token)
          .catch(() => null),
      );
    req.firebaseUser = decodedToken ?? null;
    if (!decodedToken) {
      if (isPublic) return true;
      throw new UnauthorizedException("Invalid or expired token");
    }
    return true;
  }
}

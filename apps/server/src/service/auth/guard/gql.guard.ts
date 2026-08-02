import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CustomJwtService } from '../../service/auth/custom-jwt.service';
import { Request } from 'express';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private jwtService: CustomJwtService) {}

  canActivate(context: ExecutionContext): boolean {
    // Translate standard execution context to GraphQL context
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req as Request;

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const payload = this.jwtService.verifyToken(token);
      // Attach the decoded payload to the request object
      // This makes it available to the @CurrentUser() decorator later
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
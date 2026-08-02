import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Export this so your @CurrentUser decorator and Guards can use it
export interface JwtPayload {
  sub: string;
  role: string;
}

@Injectable()
export class CustomJwtService {
  constructor(private readonly jwtService: JwtService) {}

  signToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): JwtPayload {
    // This will throw an error if the token is invalid or expired,
    // which our GqlAuthGuard gracefully catches.
    return this.jwtService.verify<JwtPayload>(token);
  }
}
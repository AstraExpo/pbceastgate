import { Injectable, UnauthorizedException } from "@nestjs/common";
import { getAuth } from "firebase-admin/auth";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/user.service";
import { CustomJwtService } from "./strategy/jwt.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: CustomJwtService,
  ) {}

  async loginWithEmail(email: string, passwordPlain: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const accessToken = this.jwtService.signToken({
      sub: user.id,
      role: user.systemRole,
    });
    return { accessToken, user };
  }

  async registerWithEmail(
    email: string,
    passwordPlain: string,
    firstName: string,
  ) {
    const user = await this.userService.createWithEmailAndPassword(
      email,
      passwordPlain,
      firstName,
    );
    const accessToken = this.jwtService.signToken({
      sub: user.id,
      role: user.systemRole,
    });
    return { accessToken, user };
  }

  async loginWithFirebaseToken(firebaseToken: string) {
    try {
      const decodedToken = await getAuth().verifyIdToken(firebaseToken);
      const { email, uid } = decodedToken;

      if (!email)
        throw new UnauthorizedException("No email provided by provider");

      const user = await this.userService.findByFirebaseUid(uid);

      if (!user) throw new UnauthorizedException("User doesn't exist");

      return { user };
    } catch (error) {
      throw new UnauthorizedException(
        `Invalid or expired provider token: ${error}`,
      );
    }
  }
}

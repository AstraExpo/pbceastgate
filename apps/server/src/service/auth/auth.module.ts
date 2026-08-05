import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { CustomJwtService } from "./strategy/jwt.service";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";

@Module({
  imports: [
    // In a production app, you'd want to use JwtModule.registerAsync
    // to load the secret from your environment variables via ConfigModule.
    JwtModule.register({
      secret: process.env.JWT_SECRET || "super-secret-fallback-key",
      signOptions: {
        expiresIn: "15m", // Short lived access token
      },
    }),
  ],
  providers: [AuthResolver, AuthService, CustomJwtService, UserService],
  exports: [CustomJwtService],
})
export class AuthModule {}

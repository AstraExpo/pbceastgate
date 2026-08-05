import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service.js";
import { AuthResponse } from "@/common/entity/auth.entity.js";
import { LoginInput } from "@/common/dto/auth/login.dto.js";
import { RegisterInput } from "@/common/dto/auth/register.dto.js";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async loginWithEmail(@Args("data") data: LoginInput) {
    return this.authService.loginWithEmail(data.email, data.password);
  }

  @Mutation(() => AuthResponse)
  async registerWithEmail(@Args("data") data: RegisterInput) {
    return this.authService.registerWithEmail(
      data.email,
      data.password,
      data.firstName,
    );
  }

  @Mutation(() => AuthResponse)
  async loginWithProvider(@Args("firebaseToken") firebaseToken: string) {
    return this.authService.loginWithFirebaseToken(firebaseToken);
  }
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { type DecodedIdToken } from "firebase-admin/auth";
import { UserService } from "../user/user.service";
import { CreateUserInput } from "@/common/dto/user/create.dto";
import {
  MembershipStatus,
  SystemRole,
} from "@/common/graphql/generated/apollo.types";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUpNewCongregant(firebaseUser: DecodedIdToken) {
    const { email, name, picture, uid } = firebaseUser;

    if (!email)
      throw new UnauthorizedException("No email provided by provider");

    const createUserInput: CreateUserInput = {
      email: email,
      name: name || email.split("@")[0],
      firebaseUid: uid,
      image: picture,
      systemRole: SystemRole.User,
      membershipStatus: MembershipStatus.Guest,
    };

    const newUser = await this.userService.createUser(createUserInput);

    return newUser;
  }
}

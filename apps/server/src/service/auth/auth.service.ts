import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { getAuth } from "firebase-admin/auth";
import { UserService } from "../user/user.service";
import { CreateUserInput } from "@/common/dto/user/create.dto";
import {
  MembershipStatus,
  SystemRole,
} from "@/common/graphql/generated/apollo.types";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUpNewUser(firebaseToken: string) {
    try {
      const decodedToken = await getAuth().verifyIdToken(firebaseToken);
      const { email, name, picture, uid } = decodedToken;

      if (!email)
        throw new UnauthorizedException("No email provided by provider");

      const existingUser = await this.userService.getByFirebaseUid(uid);

      if (existingUser) {
        throw new ConflictException(
          "An account with this email already exists. Please sign in instead.",
        );
      }

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
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new UnauthorizedException(`Sign up failed: ${error}`);
    }
  }
}

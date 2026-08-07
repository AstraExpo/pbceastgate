import { CreateUserInput } from "@/common/dto/user/create.dto";
import { UpdateUserInput } from "@/common/dto/user/update.dto";
import {
  MembershipStatus,
  SystemRole,
} from "@/common/graphql/generated/apollo.types";
import { PrismaService } from "@/common/prisma/prisma.service";
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getAdminUsers(adminRole: SystemRole.Admin) {
    if (!adminRole) return null;
    return this.prisma.user.findMany({ where: { systemRole: adminRole } });
  }

  async getEditorUsers(editorRole: SystemRole.Editor) {
    if (!editorRole) return null;
    return this.prisma.user.findMany({ where: { systemRole: editorRole } });
  }

  async getNormalUsers(userRole: SystemRole.User) {
    if (!userRole) return null;
    return this.prisma.user.findMany({ where: { systemRole: userRole } });
  }

  async getMemberUsers(memberStatus: MembershipStatus.Member) {
    if (!memberStatus) return null;
    return this.prisma.user.findMany({
      where: { membershipStatus: memberStatus },
    });
  }

  async getGuestUsers(guestStatus: MembershipStatus.Guest) {
    if (!guestStatus) return null;
    return this.prisma.user.findMany({
      where: { membershipStatus: guestStatus },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { email } });
  }

  async getById(userId: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }

  async getByFirebaseUid(firebaseUid: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { firebaseUid },
    });
  }

  async createUser(input: CreateUserInput) {
    const existing = await this.getByEmail(input.email);
    if (existing) throw new ConflictException("Email already in use");

    return this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        firebaseUid: input.firebaseUid,
        image: input.image,
        systemRole: input.systemRole,
        membershipStatus: input.membershipStatus,

        profile: {
          create: {
            name: input.name,
            avatarUrls: input.image ? [input.image] : [],
            backgroundUrls: input.image ? [input.image] : [],
          },
        },
      },
      include: {
        profile: true,
      },
    });
  }

  async updateUserDetails(userId: string, input: UpdateUserInput) {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: input,
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${userId} not found ${error}`);
    }
  }

  async deleteUser(userId: string) {
    try {
      return await this.prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${userId} not found ${error}`);
    }
  }
}

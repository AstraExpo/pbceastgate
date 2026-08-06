import { CreateUserInput } from "@/common/dto/user/create.dto";
import { UpdateUserInput } from "@/common/dto/user/update.dto";
import { PrismaService } from "@/common/prisma/prisma.service";
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByFirebaseUid(firebaseUid: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { firebaseUid },
    });
  }

  async createWithEmailAndPassword(
    email: string,
    passwordPlain: string,
    firstName: string,
  ) {
    const existing = await this.findByEmail(email);
    if (existing) throw new ConflictException("Email already in use");

    const hashedPassword = await bcrypt.hash(passwordPlain, 10);

    return this.prisma.user.create({
      data: {
        name: firstName,
        email,
        firebaseUid: "",
      },
    });
  }

  async upsertProviderUser(
    email: string,
    firstName: string,
    avatarUrl?: string,
  ) {
    return this.prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name: firstName,
        email,
        emailVerified: true,
        firebaseUid: "",
      },
    });
  }

  async createUser(data: CreateUserInput) {
    const existing = await this.findByEmail(data.email);
    if (existing) throw new ConflictException("Email already in use");

    let hashedPassword = null;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        firebaseUid: "",
      },
    });
  }

  async updateUserDetails(id: string, data: UpdateUserInput) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}

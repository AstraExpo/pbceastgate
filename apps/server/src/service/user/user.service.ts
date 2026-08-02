import { PrismaService } from '#/common/prisma/prisma.service.js';
import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // Used for Native Email/Password Registration
  async createWithEmailAndPassword(email: string, passwordPlain: string, firstName: string) {
    const existing = await this.findByEmail(email);
    if (existing) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(passwordPlain, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: { firstName, lastName: '' }
        }
      },
      include: { profile: true }
    });
  }

  // Used for Google, Apple, Microsoft (No password required)
  async upsertProviderUser(email: string, firstName: string, avatarUrl?: string) {
    return this.prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        emailVerified: true,
        profile: {
          create: { firstName, lastName: '', avatarUrl }
        }
      },
      include: { profile: true }
    });
  }
}
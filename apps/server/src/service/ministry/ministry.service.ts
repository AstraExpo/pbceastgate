import { CreateMinistryInput } from '#/common/dto/ministry/create.dto.js';
import { UpdateMinistryInput } from '#/common/dto/ministry/update.dto.js';
import { PrismaService } from '#/common/prisma/prisma.service.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MinistryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.ministry.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.ministry.findUnique({
      where: { id },
    });
  }

  async create(input: CreateMinistryInput) {
    return this.prisma.ministry.create({
      data: {
        name: input.name,
        description: input.description,
        headId: input.headId ? Number(input.headId) : null,
      },
    });
  }

  async update(id: number, input: UpdateMinistryInput) {
    return this.prisma.ministry.update({
      where: { id },
      data: {
        name: input.name,
        description: input.description,
        headId: input.headId ? Number(input.headId) : null,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.ministry.delete({
      where: { id },
    });
  }
}
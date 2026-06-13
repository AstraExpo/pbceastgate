import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { MinistryService } from './ministry.service.js';
import { Ministry } from '#/common/entity/ministry.entity.js';
import { CreateMinistryInput } from '#/common/dto/ministry/create.dto.js';
import { UpdateMinistryInput } from '#/common/dto/ministry/update.dto.js';

@Resolver(() => Ministry)
export class MinistryResolver {
  constructor(private ministryService: MinistryService) {}

  @Query(() => [Ministry], { name: 'ministries' })
  async getMinistries() {
    return this.ministryService.findAll();
  }

  @Query(() => Ministry, { name: 'ministry', nullable: true })
  async getMinistry(@Args('id', { type: () => ID }) id: number) {
    return this.ministryService.findOne(id);
  }

  @Mutation(() => Ministry)
  async createMinistry(@Args('input') input: CreateMinistryInput) {
    return this.ministryService.create(input);
  }

  @Mutation(() => Ministry)
  async updateMinistry(@Args('input') input: UpdateMinistryInput) {
    return this.ministryService.update(input);
  }

  @Mutation(() => Ministry)
  async deleteMinistry(@Args('id', { type: () => ID }) id: number) {
    return this.ministryService.delete(id);
  }
}
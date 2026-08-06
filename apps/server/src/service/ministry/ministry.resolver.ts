import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { MinistryService } from "./ministry.service";
import { Ministry } from "@/common/entity/ministry.entity";
import { CreateMinistryInput } from "@/common/dto/ministry/create.dto";
import { UpdateMinistryInput } from "@/common/dto/ministry/update.dto";

@Resolver(() => Ministry)
export class MinistryResolver {
  constructor(private readonly ministryService: MinistryService) {}

  @Query(() => [Ministry], { name: "ministries" })
  async getMinistries() {
    return this.ministryService.findAll();
  }

  @Query(() => Ministry, { name: "ministry", nullable: true })
  async getMinistry(@Args("id") id: string) {
    return this.ministryService.findOne(id);
  }

  @Mutation(() => Ministry)
  async createMinistry(@Args("input") input: CreateMinistryInput) {
    return this.ministryService.create(input);
  }

  @Mutation(() => Ministry)
  async updateMinistry(
    @Args("id") id: string,
    @Args("input") input: UpdateMinistryInput,
  ) {
    return this.ministryService.update(id, input);
  }

  @Mutation(() => Ministry)
  async deleteMinistry(@Args("id") id: string) {
    return this.ministryService.delete(id);
  }
}

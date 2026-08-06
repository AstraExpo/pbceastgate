import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "@/common/entity/user.entity";
import { CreateUserInput } from "@/common/dto/user/create.dto";
import { UpdateUserInput } from "@/common/dto/user/update.dto";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // --- QUERIES ---

  @Query(() => User, { nullable: true, name: "userByEmail" })
  async getUserByEmail(@Args("email") email: string) {
    return this.userService.findByEmail(email);
  }

  @Query(() => User, { nullable: true, name: "userById" })
  async getUserById(@Args("id") id: string) {
    return this.userService.findById(id);
  }

  @Query(() => User)
  async getUserByFirebaseUid(@Args("firebaseUid") firebaseUid: string) {
    return this.userService.findByFirebaseUid(firebaseUid);
  }

  // --- MUTATIONS ---

  @Mutation(() => User, { name: "createUser" })
  async createUser(@Args("data") data: CreateUserInput) {
    return this.userService.createUser(data);
  }

  @Mutation(() => User, { name: "updateUserDetails" })
  async updateUserDetails(
    @Args("id") id: string,
    @Args("data") data: UpdateUserInput,
  ) {
    return this.userService.updateUserDetails(id, data);
  }

  @Mutation(() => User, { name: "deleteUser" })
  async deleteUser(@Args("id") id: string) {
    return this.userService.deleteUser(id);
  }
}

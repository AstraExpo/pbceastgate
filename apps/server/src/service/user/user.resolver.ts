import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "@/common/entity/user.entity";
import { CreateUserInput } from "@/common/dto/user/create.dto";
import { UpdateUserInput } from "@/common/dto/user/update.dto";
import { type GraphQLContext } from "@/common/config/graphql.config";
import { Public } from "../auth/decorators/public.decorators";
import { MembershipStatus, SystemRole } from "@/generated/prisma/enums";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // --------------------------------------------------
  // AUTHENTICATION
  // --------------------------------------------------

  @Public()
  @Query(() => User, {
    nullable: true,
  })
  currentUser(@Context() context: GraphQLContext): User | null {
    return context.req.auth?.user ?? null;
  }

  // --------------------------------------------------
  // QUERIES
  // --------------------------------------------------

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }

  @Query(() => [User])
  async getAdminUsers(
    @Args("adminRole", { type: () => SystemRole })
    adminRole: SystemRole,
  ) {
    return this.userService.getAdminUsers(adminRole);
  }

  @Query(() => [User])
  async getEditorUsers(
    @Args("editorRole", { type: () => SystemRole })
    editorRole: SystemRole,
  ) {
    return this.userService.getEditorUsers(editorRole);
  }

  @Query(() => [User])
  async getNormalUsers(
    @Args("userRole", { type: () => SystemRole })
    userRole: SystemRole,
  ) {
    return this.userService.getNormalUsers(userRole);
  }

  @Query(() => [User])
  async getMemberUsers(
    @Args("memberStatus", { type: () => MembershipStatus })
    memberStatus: MembershipStatus,
  ) {
    return this.userService.getMemberUsers(memberStatus);
  }

  @Query(() => [User])
  async getGuestUsers(
    @Args("guestStatus", { type: () => MembershipStatus })
    guestStatus: MembershipStatus,
  ) {
    return this.userService.getGuestUsers(guestStatus);
  }

  @Query(() => User)
  async getUserByEmail(@Args("email") email: string) {
    return this.userService.getByEmail(email);
  }

  @Query(() => User)
  async getUserById(@Args("userId") userId: string) {
    return this.userService.getById(userId);
  }

  @Query(() => User)
  async getUserByFirebaseUid(@Args("firebaseUid") firebaseUid: string) {
    return this.userService.getByFirebaseUid(firebaseUid);
  }

  // --------------------------------------------------
  // MUTATIONS
  // --------------------------------------------------

  @Mutation(() => User)
  async createUser(@Args("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args("userId") userId: string,
    @Args("input") input: UpdateUserInput,
  ) {
    return this.userService.updateUserDetails(userId, input);
  }

  @Mutation(() => User)
  async deleteUser(@Args("userId") userId: string) {
    return this.userService.deleteUser(userId);
  }
}

import { MembershipStatus, SystemRole } from '@eastgate/database';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';

// Register your Prisma enums so GraphQL understands them
registerEnumType(SystemRole, {
  name: 'SystemRole',
  description: 'The system access level of the user',
});

registerEnumType(MembershipStatus, {
  name: 'MembershipStatus',
  description: 'The church membership status of the user',
});

@ObjectType({ description: 'The core user entity' })
export class User {
  @Field(() => GraphQLUUID,{ description: 'Public facing UUID' })
  id!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Boolean)
  emailVerified!: boolean;

  @Field(() => Boolean)
  banned!: boolean;

  @Field(() => String, { nullable: true })
  banReason?: string;

  @Field(() => Date, { nullable: true })
  banExpires?: Date;

  @Field(() => SystemRole)
  systemRole!: SystemRole;

  @Field(() => MembershipStatus)
  membershipStatus!: MembershipStatus;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  // --- RELATIONS ---
  // To use these, you need to create their respective @ObjectType() classes
  // and uncomment them. I've left them commented out to prevent circular dependency errors
  // until those models are built.

  /*
  @Field(() => Profile, { nullable: true })
  profile?: Profile;

  @Field(() => DeaconProfile, { nullable: true })
  deaconProfile?: DeaconProfile;

  @Field(() => MembershipProgress, { nullable: true })
  membershipProgress?: MembershipProgress;

  @Field(() => StaffProfile, { nullable: true })
  staffProfile?: StaffProfile;

  @Field(() => [Ministry], { nullable: true })
  ledMinistries?: Ministry[];

  @Field(() => [Department], { nullable: true })
  ledDepartments?: Department[];

  @Field(() => [MinistryMember], { nullable: true })
  ministryMemberships?: MinistryMember[];

  @Field(() => [DepartmentMember], { nullable: true })
  departmentMemberships?: DepartmentMember[];

  @Field(() => [Order], { nullable: true })
  orders?: Order[];

  @Field(() => [Donation], { nullable: true })
  donations?: Donation[];

  @Field(() => [EventRegistration], { nullable: true })
  registrations?: EventRegistration[];

  @Field(() => [MaterialDonation], { nullable: true })
  materialDonations?: MaterialDonation[];

  @Field(() => [Pledge], { nullable: true })
  pledges?: Pledge[];

  @Field(() => [VolunteerSignUp], { nullable: true })
  volunteerSignUps?: VolunteerSignUp[];

  @Field(() => [PrayerRequest], { nullable: true })
  prayerRequests?: PrayerRequest[];

  @Field(() => [CommunityPost], { nullable: true })
  communityPosts?: CommunityPost[];
  */
}
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
};

export enum AuthStatus {
  Authenticated = 'Authenticated',
  UnAuthenticated = 'UnAuthenticated'
}

export type AuthStatusResponse = {
  __typename?: 'AuthStatusResponse';
  status: AuthStatus;
  user?: Maybe<User>;
};

export type CreateMinistryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  headId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firebaseUid: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  membershipStatus?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  systemRole?: InputMaybe<Scalars['String']['input']>;
};

export enum MembershipStatus {
  Guest = 'Guest',
  Member = 'Member'
}

export type Ministry = {
  __typename?: 'Ministry';
  description?: Maybe<Scalars['String']['output']>;
  headId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateAdmin: User;
  authenticateCongregant: User;
  createMinistry: Ministry;
  createUser: User;
  deleteMinistry: Ministry;
  deleteUser: User;
  signUpCongregant: User;
  updateMinistry: Ministry;
  updateUser: User;
};


export type MutationCreateMinistryArgs = {
  input: CreateMinistryInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteMinistryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationUpdateMinistryArgs = {
  id: Scalars['String']['input'];
  input: UpdateMinistryInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  currentAdmin: AuthStatusResponse;
  currentCongregant: AuthStatusResponse;
  currentUser?: Maybe<User>;
  getAdminUsers: Array<User>;
  getEditorUsers: Array<User>;
  getGuestUsers: Array<User>;
  getMemberUsers: Array<User>;
  getNormalUsers: Array<User>;
  getUserByEmail: User;
  getUserByFirebaseUid: User;
  getUserById: User;
  getUsers: Array<User>;
  ministries: Array<Ministry>;
  ministry?: Maybe<Ministry>;
  sermons: Array<Sermon>;
};


export type QueryGetAdminUsersArgs = {
  adminRole: SystemRole;
};


export type QueryGetEditorUsersArgs = {
  editorRole: SystemRole;
};


export type QueryGetGuestUsersArgs = {
  guestStatus: MembershipStatus;
};


export type QueryGetMemberUsersArgs = {
  memberStatus: MembershipStatus;
};


export type QueryGetNormalUsersArgs = {
  userRole: SystemRole;
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUserByFirebaseUidArgs = {
  firebaseUid: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryMinistryArgs = {
  id: Scalars['String']['input'];
};

export type Sermon = {
  __typename?: 'Sermon';
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  preacher: Scalars['String']['output'];
  title: Scalars['String']['output'];
  videoUrl?: Maybe<Scalars['String']['output']>;
};

export enum SystemRole {
  Admin = 'Admin',
  Editor = 'Editor',
  System = 'System',
  User = 'User'
}

export type UpdateMinistryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  headId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firebaseUid?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  membershipStatus?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  systemRole?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  banExpires?: Maybe<Scalars['DateTime']['output']>;
  banReason?: Maybe<Scalars['String']['output']>;
  banned: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  firebaseUid: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  membershipStatus: MembershipStatus;
  name: Scalars['String']['output'];
  systemRole: SystemRole;
  updatedAt: Scalars['DateTime']['output'];
};

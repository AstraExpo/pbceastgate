export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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

/** The church membership status of the user */
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
  authenticateUsers: User;
  createMinistry: Ministry;
  createUser: User;
  deleteMinistry: Ministry;
  deleteUser: User;
  signUpUser: User;
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


export type MutationSignUpUserArgs = {
  firebaseToken: Scalars['String']['input'];
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
  adminRole: Scalars['String']['input'];
};


export type QueryGetEditorUsersArgs = {
  editorRole: Scalars['String']['input'];
};


export type QueryGetGuestUsersArgs = {
  guestStatus: Scalars['String']['input'];
};


export type QueryGetMemberUsersArgs = {
  memberStatus: Scalars['String']['input'];
};


export type QueryGetNormalUsersArgs = {
  userRole: Scalars['String']['input'];
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

/** The system access level of the user */
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

/** The core user entity */
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

// @ts-nocheck

import { GraphQLClient, type RequestOptions } from "graphql-request";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string };
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  /** The JWT access token */
  accessToken: Scalars["String"]["output"];
  /** The authenticated user profile */
  user: User;
};

export type CreateMinistryInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  headId?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

/** The church membership status of the user */
export enum MembershipStatus {
  Guest = "Guest",
  Member = "Member",
}

export type Ministry = {
  __typename?: "Ministry";
  description?: Maybe<Scalars["String"]["output"]>;
  headId?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createMinistry: Ministry;
  deleteMinistry: Ministry;
  loginWithEmail: AuthResponse;
  loginWithProvider: User;
  registerWithEmail: AuthResponse;
  updateMinistry: Ministry;
};

export type MutationCreateMinistryArgs = {
  input: CreateMinistryInput;
};

export type MutationDeleteMinistryArgs = {
  id: Scalars["String"]["input"];
};

export type MutationLoginWithEmailArgs = {
  data: LoginInput;
};

export type MutationLoginWithProviderArgs = {
  firebaseToken: Scalars["String"]["input"];
};

export type MutationRegisterWithEmailArgs = {
  data: RegisterInput;
};

export type MutationUpdateMinistryArgs = {
  id: Scalars["String"]["input"];
  input: UpdateMinistryInput;
};

export type Query = {
  __typename?: "Query";
  ministries: Array<Ministry>;
  ministry?: Maybe<Ministry>;
  sermons: Array<Sermon>;
};

export type QueryMinistryArgs = {
  id: Scalars["String"]["input"];
};

export type RegisterInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Sermon = {
  __typename?: "Sermon";
  date: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  preacher: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  videoUrl?: Maybe<Scalars["String"]["output"]>;
};

/** The system access level of the user */
export enum SystemRole {
  Admin = "Admin",
  Editor = "Editor",
  System = "System",
  User = "User",
}

export type UpdateMinistryInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  headId?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

/** The core user entity */
export type User = {
  __typename?: "User";
  banExpires?: Maybe<Scalars["DateTime"]["output"]>;
  banReason?: Maybe<Scalars["String"]["output"]>;
  banned: Scalars["Boolean"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  emailVerified: Scalars["Boolean"]["output"];
  firebaseUid: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  membershipStatus: MembershipStatus;
  name: Scalars["String"]["output"];
  systemRole: SystemRole;
  updatedAt: Scalars["DateTime"]["output"];
};

export type AuthenticateAdminMutationVariables = Exact<{
  firebaseToken: Scalars["String"]["input"];
}>;

export type AuthenticateAdminMutation = {
  __typename?: "Mutation";
  loginWithProvider: {
    __typename?: "User";
    id: string;
    firebaseUid: string;
    name: string;
    email: string;
    image?: string | null;
    emailVerified: boolean;
    banned: boolean;
    banReason?: string | null;
    banExpires?: string | null;
    systemRole: SystemRole;
    membershipStatus: MembershipStatus;
    createdAt: string;
    updatedAt: string;
  };
};

export type GetMinistriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetMinistriesQuery = {
  __typename?: "Query";
  ministries: Array<{
    __typename?: "Ministry";
    id: string;
    name: string;
    description?: string | null;
    headId?: string | null;
  }>;
};

export type GetMinistryQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetMinistryQuery = {
  __typename?: "Query";
  ministry?: {
    __typename?: "Ministry";
    id: string;
    name: string;
    description?: string | null;
    headId?: string | null;
  } | null;
};

export type CreateMinistryMutationVariables = Exact<{
  input: CreateMinistryInput;
}>;

export type CreateMinistryMutation = {
  __typename?: "Mutation";
  createMinistry: {
    __typename?: "Ministry";
    id: string;
    name: string;
    description?: string | null;
  };
};

export type UpdateMinistryMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  input: UpdateMinistryInput;
}>;

export type UpdateMinistryMutation = {
  __typename?: "Mutation";
  updateMinistry: {
    __typename?: "Ministry";
    id: string;
    name: string;
    description?: string | null;
  };
};

export type DeleteMinistryMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type DeleteMinistryMutation = {
  __typename?: "Mutation";
  deleteMinistry: { __typename?: "Ministry"; id: string };
};

export const AuthenticateAdminDocument = new TypedDocumentString(`
    mutation AuthenticateAdmin($firebaseToken: String!) {
  loginWithProvider(firebaseToken: $firebaseToken) {
    id
    firebaseUid
    name
    email
    image
    emailVerified
    banned
    banReason
    banExpires
    systemRole
    membershipStatus
    createdAt
    updatedAt
  }
}
    `);
export const GetMinistriesDocument = new TypedDocumentString(`
    query GetMinistries {
  ministries {
    id
    name
    description
    headId
  }
}
    `);
export const GetMinistryDocument = new TypedDocumentString(`
    query GetMinistry($id: String!) {
  ministry(id: $id) {
    id
    name
    description
    headId
  }
}
    `);
export const CreateMinistryDocument = new TypedDocumentString(`
    mutation CreateMinistry($input: CreateMinistryInput!) {
  createMinistry(input: $input) {
    id
    name
    description
  }
}
    `);
export const UpdateMinistryDocument = new TypedDocumentString(`
    mutation UpdateMinistry($id: String!, $input: UpdateMinistryInput!) {
  updateMinistry(id: $id, input: $input) {
    id
    name
    description
  }
}
    `);
export const DeleteMinistryDocument = new TypedDocumentString(`
    mutation DeleteMinistry($id: String!) {
  deleteMinistry(id: $id) {
    id
  }
}
    `);

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    AuthenticateAdmin(
      variables: AuthenticateAdminMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<AuthenticateAdminMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<AuthenticateAdminMutation>({
            document: AuthenticateAdminDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "AuthenticateAdmin",
        "mutation",
        variables,
      );
    },
    GetMinistries(
      variables?: GetMinistriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<GetMinistriesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetMinistriesQuery>({
            document: GetMinistriesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "GetMinistries",
        "query",
        variables,
      );
    },
    GetMinistry(
      variables: GetMinistryQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<GetMinistryQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<GetMinistryQuery>({
            document: GetMinistryDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "GetMinistry",
        "query",
        variables,
      );
    },
    CreateMinistry(
      variables: CreateMinistryMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<CreateMinistryMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<CreateMinistryMutation>({
            document: CreateMinistryDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "CreateMinistry",
        "mutation",
        variables,
      );
    },
    UpdateMinistry(
      variables: UpdateMinistryMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<UpdateMinistryMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UpdateMinistryMutation>({
            document: UpdateMinistryDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "UpdateMinistry",
        "mutation",
        variables,
      );
    },
    DeleteMinistry(
      variables: DeleteMinistryMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit["signal"],
    ): Promise<DeleteMinistryMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<DeleteMinistryMutation>({
            document: DeleteMinistryDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        "DeleteMinistry",
        "mutation",
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;

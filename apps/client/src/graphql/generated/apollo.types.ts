// @ts-nocheck

import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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
  __typename: 'Ministry';
  description?: Maybe<Scalars['String']['output']>;
  headId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename: 'Mutation';
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
  __typename: 'Query';
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
  __typename: 'Sermon';
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
  __typename: 'User';
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

export type GetMinistriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMinistriesQuery = { ministries: Array<{ __typename: 'Ministry', id: string, name: string, description?: string | null, headId?: string | null }> };

export type GetMinistryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMinistryQuery = { ministry?: { __typename: 'Ministry', id: string, name: string, description?: string | null, headId?: string | null } | null };

export type CreateMinistryMutationVariables = Exact<{
  input: CreateMinistryInput;
}>;


export type CreateMinistryMutation = { createMinistry: { __typename: 'Ministry', id: string, name: string, description?: string | null } };

export type UpdateMinistryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateMinistryInput;
}>;


export type UpdateMinistryMutation = { updateMinistry: { __typename: 'Ministry', id: string, name: string, description?: string | null } };

export type DeleteMinistryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteMinistryMutation = { deleteMinistry: { __typename: 'Ministry', id: string } };


export const GetMinistriesDocument = gql`
    query GetMinistries {
  ministries {
    id
    name
    description
    headId
  }
}
    `;

/**
 * __useGetMinistriesQuery__
 *
 * To run a query within a React component, call `useGetMinistriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMinistriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMinistriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMinistriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMinistriesQuery, GetMinistriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMinistriesQuery, GetMinistriesQueryVariables>(GetMinistriesDocument, options);
      }
export function useGetMinistriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMinistriesQuery, GetMinistriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMinistriesQuery, GetMinistriesQueryVariables>(GetMinistriesDocument, options);
        }
// @ts-ignore
export function useGetMinistriesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMinistriesQuery, GetMinistriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMinistriesQuery, GetMinistriesQueryVariables>;
export function useGetMinistriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMinistriesQuery, GetMinistriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMinistriesQuery | undefined, GetMinistriesQueryVariables>;
export function useGetMinistriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMinistriesQuery, GetMinistriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMinistriesQuery, GetMinistriesQueryVariables>(GetMinistriesDocument, options);
        }
export type GetMinistriesQueryHookResult = ReturnType<typeof useGetMinistriesQuery>;
export type GetMinistriesLazyQueryHookResult = ReturnType<typeof useGetMinistriesLazyQuery>;
export type GetMinistriesSuspenseQueryHookResult = ReturnType<typeof useGetMinistriesSuspenseQuery>;
export type GetMinistriesQueryResult = ApolloReactCommon.QueryResult<GetMinistriesQuery, GetMinistriesQueryVariables>;
export const GetMinistryDocument = gql`
    query GetMinistry($id: String!) {
  ministry(id: $id) {
    id
    name
    description
    headId
  }
}
    `;

/**
 * __useGetMinistryQuery__
 *
 * To run a query within a React component, call `useGetMinistryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMinistryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMinistryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMinistryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetMinistryQuery, GetMinistryQueryVariables> & ({ variables: GetMinistryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMinistryQuery, GetMinistryQueryVariables>(GetMinistryDocument, options);
      }
export function useGetMinistryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMinistryQuery, GetMinistryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMinistryQuery, GetMinistryQueryVariables>(GetMinistryDocument, options);
        }
// @ts-ignore
export function useGetMinistrySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMinistryQuery, GetMinistryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMinistryQuery, GetMinistryQueryVariables>;
export function useGetMinistrySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMinistryQuery, GetMinistryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMinistryQuery | undefined, GetMinistryQueryVariables>;
export function useGetMinistrySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMinistryQuery, GetMinistryQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMinistryQuery, GetMinistryQueryVariables>(GetMinistryDocument, options);
        }
export type GetMinistryQueryHookResult = ReturnType<typeof useGetMinistryQuery>;
export type GetMinistryLazyQueryHookResult = ReturnType<typeof useGetMinistryLazyQuery>;
export type GetMinistrySuspenseQueryHookResult = ReturnType<typeof useGetMinistrySuspenseQuery>;
export type GetMinistryQueryResult = ApolloReactCommon.QueryResult<GetMinistryQuery, GetMinistryQueryVariables>;
export const CreateMinistryDocument = gql`
    mutation CreateMinistry($input: CreateMinistryInput!) {
  createMinistry(input: $input) {
    id
    name
    description
  }
}
    `;
export type CreateMinistryMutationFn = ApolloReactCommon.MutationFunction<CreateMinistryMutation, CreateMinistryMutationVariables>;

/**
 * __useCreateMinistryMutation__
 *
 * To run a mutation, you first call `useCreateMinistryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMinistryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMinistryMutation, { data, loading, error }] = useCreateMinistryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMinistryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMinistryMutation, CreateMinistryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateMinistryMutation, CreateMinistryMutationVariables>(CreateMinistryDocument, options);
      }
export type CreateMinistryMutationHookResult = ReturnType<typeof useCreateMinistryMutation>;
export type CreateMinistryMutationResult = ApolloReactCommon.MutationResult<CreateMinistryMutation>;
export type CreateMinistryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMinistryMutation, CreateMinistryMutationVariables>;
export const UpdateMinistryDocument = gql`
    mutation UpdateMinistry($id: String!, $input: UpdateMinistryInput!) {
  updateMinistry(id: $id, input: $input) {
    id
    name
    description
  }
}
    `;
export type UpdateMinistryMutationFn = ApolloReactCommon.MutationFunction<UpdateMinistryMutation, UpdateMinistryMutationVariables>;

/**
 * __useUpdateMinistryMutation__
 *
 * To run a mutation, you first call `useUpdateMinistryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMinistryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMinistryMutation, { data, loading, error }] = useUpdateMinistryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMinistryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMinistryMutation, UpdateMinistryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateMinistryMutation, UpdateMinistryMutationVariables>(UpdateMinistryDocument, options);
      }
export type UpdateMinistryMutationHookResult = ReturnType<typeof useUpdateMinistryMutation>;
export type UpdateMinistryMutationResult = ApolloReactCommon.MutationResult<UpdateMinistryMutation>;
export type UpdateMinistryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMinistryMutation, UpdateMinistryMutationVariables>;
export const DeleteMinistryDocument = gql`
    mutation DeleteMinistry($id: String!) {
  deleteMinistry(id: $id) {
    id
  }
}
    `;
export type DeleteMinistryMutationFn = ApolloReactCommon.MutationFunction<DeleteMinistryMutation, DeleteMinistryMutationVariables>;

/**
 * __useDeleteMinistryMutation__
 *
 * To run a mutation, you first call `useDeleteMinistryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMinistryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMinistryMutation, { data, loading, error }] = useDeleteMinistryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMinistryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMinistryMutation, DeleteMinistryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteMinistryMutation, DeleteMinistryMutationVariables>(DeleteMinistryDocument, options);
      }
export type DeleteMinistryMutationHookResult = ReturnType<typeof useDeleteMinistryMutation>;
export type DeleteMinistryMutationResult = ApolloReactCommon.MutationResult<DeleteMinistryMutation>;
export type DeleteMinistryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMinistryMutation, DeleteMinistryMutationVariables>;
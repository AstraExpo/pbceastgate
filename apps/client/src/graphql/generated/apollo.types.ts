// @ts-nocheck

import { gql } from '@apollo/client';
import type * as Apollo from '@apollo/client';
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
};

export type CreateMinistryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  headId?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
};

export type Ministry = {
  __typename?: 'Ministry';
  description?: Maybe<Scalars['String']['output']>;
  headId?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMinistry: Ministry;
  deleteMinistry: Ministry;
  updateMinistry: Ministry;
};


export type MutationCreateMinistryArgs = {
  input: CreateMinistryInput;
};


export type MutationDeleteMinistryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateMinistryArgs = {
  input: UpdateMinistryInput;
};

export type Query = {
  __typename?: 'Query';
  ministries: Array<Ministry>;
  ministry?: Maybe<Ministry>;
  sermons: Array<Sermon>;
};


export type QueryMinistryArgs = {
  id: Scalars['ID']['input'];
};

export type Sermon = {
  __typename?: 'Sermon';
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  preacher: Scalars['String']['output'];
  title: Scalars['String']['output'];
  videoUrl?: Maybe<Scalars['String']['output']>;
};

export type UpdateMinistryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  headId?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GetMinistriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMinistriesQuery = { __typename?: 'Query', ministries: Array<{ __typename?: 'Ministry', id: number, name: string, description?: string | null, headId?: number | null }> };

export type GetMinistryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMinistryQuery = { __typename?: 'Query', ministry?: { __typename?: 'Ministry', id: number, name: string, description?: string | null, headId?: number | null } | null };

export type CreateMinistryMutationVariables = Exact<{
  input: CreateMinistryInput;
}>;


export type CreateMinistryMutation = { __typename?: 'Mutation', createMinistry: { __typename?: 'Ministry', id: number, name: string } };

export type UpdateMinistryMutationVariables = Exact<{
  input: UpdateMinistryInput;
}>;


export type UpdateMinistryMutation = { __typename?: 'Mutation', updateMinistry: { __typename?: 'Ministry', id: number, name: string, description?: string | null } };

export type DeleteMinistryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteMinistryMutation = { __typename?: 'Mutation', deleteMinistry: { __typename?: 'Ministry', id: number } };


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
export type GetMinistriesQueryResult = Apollo.QueryResult<GetMinistriesQuery, GetMinistriesQueryVariables>;
export const GetMinistryDocument = gql`
    query GetMinistry($id: ID!) {
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
export type GetMinistryQueryResult = Apollo.QueryResult<GetMinistryQuery, GetMinistryQueryVariables>;
export const CreateMinistryDocument = gql`
    mutation CreateMinistry($input: CreateMinistryInput!) {
  createMinistry(input: $input) {
    id
    name
  }
}
    `;
export type CreateMinistryMutationFn = Apollo.MutationFunction<CreateMinistryMutation, CreateMinistryMutationVariables>;

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
export type CreateMinistryMutationResult = Apollo.MutationResult<CreateMinistryMutation>;
export type CreateMinistryMutationOptions = Apollo.BaseMutationOptions<CreateMinistryMutation, CreateMinistryMutationVariables>;
export const UpdateMinistryDocument = gql`
    mutation UpdateMinistry($input: UpdateMinistryInput!) {
  updateMinistry(input: $input) {
    id
    name
    description
  }
}
    `;
export type UpdateMinistryMutationFn = Apollo.MutationFunction<UpdateMinistryMutation, UpdateMinistryMutationVariables>;

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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMinistryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMinistryMutation, UpdateMinistryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateMinistryMutation, UpdateMinistryMutationVariables>(UpdateMinistryDocument, options);
      }
export type UpdateMinistryMutationHookResult = ReturnType<typeof useUpdateMinistryMutation>;
export type UpdateMinistryMutationResult = Apollo.MutationResult<UpdateMinistryMutation>;
export type UpdateMinistryMutationOptions = Apollo.BaseMutationOptions<UpdateMinistryMutation, UpdateMinistryMutationVariables>;
export const DeleteMinistryDocument = gql`
    mutation DeleteMinistry($id: ID!) {
  deleteMinistry(id: $id) {
    id
  }
}
    `;
export type DeleteMinistryMutationFn = Apollo.MutationFunction<DeleteMinistryMutation, DeleteMinistryMutationVariables>;

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
export type DeleteMinistryMutationResult = Apollo.MutationResult<DeleteMinistryMutation>;
export type DeleteMinistryMutationOptions = Apollo.BaseMutationOptions<DeleteMinistryMutation, DeleteMinistryMutationVariables>;
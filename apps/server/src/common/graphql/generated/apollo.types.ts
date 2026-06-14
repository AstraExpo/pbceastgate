import { GraphQLClient, RequestOptions } from 'graphql-request';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
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
  headId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type Ministry = {
  __typename?: 'Ministry';
  description?: Maybe<Scalars['String']['output']>;
  headId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
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
  id: Scalars['Int']['input'];
};


export type MutationUpdateMinistryArgs = {
  id: Scalars['Int']['input'];
  input: UpdateMinistryInput;
};

export type Query = {
  __typename?: 'Query';
  ministries: Array<Ministry>;
  ministry?: Maybe<Ministry>;
  sermons: Array<Sermon>;
};


export type QueryMinistryArgs = {
  id: Scalars['Int']['input'];
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
  headId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GetMinistriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMinistriesQuery = { __typename?: 'Query', ministries: Array<{ __typename?: 'Ministry', id: number, name: string, description?: string | null, headId?: number | null }> };

export type GetMinistryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetMinistryQuery = { __typename?: 'Query', ministry?: { __typename?: 'Ministry', id: number, name: string, description?: string | null, headId?: number | null } | null };

export type CreateMinistryMutationVariables = Exact<{
  input: CreateMinistryInput;
}>;


export type CreateMinistryMutation = { __typename?: 'Mutation', createMinistry: { __typename?: 'Ministry', id: number, name: string, description?: string | null } };

export type UpdateMinistryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateMinistryInput;
}>;


export type UpdateMinistryMutation = { __typename?: 'Mutation', updateMinistry: { __typename?: 'Ministry', id: number, name: string, description?: string | null } };

export type DeleteMinistryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteMinistryMutation = { __typename?: 'Mutation', deleteMinistry: { __typename?: 'Ministry', id: number } };


export const GetMinistriesDocument = `
    query GetMinistries {
  ministries {
    id
    name
    description
    headId
  }
}
    `;
export const GetMinistryDocument = `
    query GetMinistry($id: Int!) {
  ministry(id: $id) {
    id
    name
    description
    headId
  }
}
    `;
export const CreateMinistryDocument = `
    mutation CreateMinistry($input: CreateMinistryInput!) {
  createMinistry(input: $input) {
    id
    name
    description
  }
}
    `;
export const UpdateMinistryDocument = `
    mutation UpdateMinistry($id: Int!, $input: UpdateMinistryInput!) {
  updateMinistry(id: $id, input: $input) {
    id
    name
    description
  }
}
    `;
export const DeleteMinistryDocument = `
    mutation DeleteMinistry($id: Int!) {
  deleteMinistry(id: $id) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetMinistries(variables?: GetMinistriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetMinistriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMinistriesQuery>({ document: GetMinistriesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetMinistries', 'query', variables);
    },
    GetMinistry(variables: GetMinistryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetMinistryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMinistryQuery>({ document: GetMinistryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetMinistry', 'query', variables);
    },
    CreateMinistry(variables: CreateMinistryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateMinistryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMinistryMutation>({ document: CreateMinistryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateMinistry', 'mutation', variables);
    },
    UpdateMinistry(variables: UpdateMinistryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateMinistryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateMinistryMutation>({ document: UpdateMinistryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateMinistry', 'mutation', variables);
    },
    DeleteMinistry(variables: DeleteMinistryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteMinistryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMinistryMutation>({ document: DeleteMinistryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteMinistry', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
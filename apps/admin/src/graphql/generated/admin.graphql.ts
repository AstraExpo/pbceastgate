/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AuthStatus =
  | 'Authenticated'
  | 'UnAuthenticated';

export type CreateMinistryInput = {
  description?: string | null | undefined;
  headId?: string | null | undefined;
  name: string;
};

export type MembershipStatus =
  | 'Guest'
  | 'Member';

export type SystemRole =
  | 'Admin'
  | 'Editor'
  | 'System'
  | 'User';

export type UpdateMinistryInput = {
  description?: string | null | undefined;
  headId?: string | null | undefined;
  name?: string | null | undefined;
};

export type UserFieldsFragment = { __typename: 'User', id: string, firebaseUid: string, name: string, email: string, image: string | null, emailVerified: boolean, banned: boolean, banReason: string | null, banExpires: string | null, systemRole: SystemRole, membershipStatus: MembershipStatus, createdAt: string, updatedAt: string };

export type AuthenticateAdminMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthenticateAdminMutation = { __typename: 'Mutation', authenticateAdmin: { __typename: 'User', id: string, firebaseUid: string, name: string, email: string, image: string | null, emailVerified: boolean, banned: boolean, banReason: string | null, banExpires: string | null, systemRole: SystemRole, membershipStatus: MembershipStatus, createdAt: string, updatedAt: string } };

export type CurrentAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentAdminQuery = { __typename: 'Query', currentAdmin: { __typename: 'AuthStatusResponse', status: AuthStatus, user: { __typename: 'User', id: string, firebaseUid: string, name: string, email: string, image: string | null, emailVerified: boolean, banned: boolean, banReason: string | null, banExpires: string | null, systemRole: SystemRole, membershipStatus: MembershipStatus, createdAt: string, updatedAt: string } | null } };

export type MinistryFieldsFragment = { __typename: 'Ministry', id: string, name: string, description: string | null, headId: string | null };

export type GetMinistriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMinistriesQuery = { __typename: 'Query', ministries: Array<{ __typename: 'Ministry', id: string, name: string, description: string | null, headId: string | null }> };

export type GetMinistryQueryVariables = Exact<{
  id: string;
}>;


export type GetMinistryQuery = { __typename: 'Query', ministry: { __typename: 'Ministry', id: string, name: string, description: string | null, headId: string | null } | null };

export type CreateMinistryMutationVariables = Exact<{
  input: CreateMinistryInput;
}>;


export type CreateMinistryMutation = { __typename: 'Mutation', createMinistry: { __typename: 'Ministry', id: string, name: string, description: string | null, headId: string | null } };

export type UpdateMinistryMutationVariables = Exact<{
  id: string;
  input: UpdateMinistryInput;
}>;


export type UpdateMinistryMutation = { __typename: 'Mutation', updateMinistry: { __typename: 'Ministry', id: string, name: string, description: string | null, headId: string | null } };

export type DeleteMinistryMutationVariables = Exact<{
  id: string;
}>;


export type DeleteMinistryMutation = { __typename: 'Mutation', deleteMinistry: { __typename: 'Ministry', id: string } };

export const UserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseUid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"banned"}},{"kind":"Field","name":{"kind":"Name","value":"banReason"}},{"kind":"Field","name":{"kind":"Name","value":"banExpires"}},{"kind":"Field","name":{"kind":"Name","value":"systemRole"}},{"kind":"Field","name":{"kind":"Name","value":"membershipStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const MinistryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MinistryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ministry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"headId"}}]}}]} as unknown as DocumentNode<MinistryFieldsFragment, unknown>;
export const AuthenticateAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthenticateAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseUid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"banned"}},{"kind":"Field","name":{"kind":"Name","value":"banReason"}},{"kind":"Field","name":{"kind":"Name","value":"banExpires"}},{"kind":"Field","name":{"kind":"Name","value":"systemRole"}},{"kind":"Field","name":{"kind":"Name","value":"membershipStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AuthenticateAdminMutation, AuthenticateAdminMutationVariables>;
export const CurrentAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseUid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"banned"}},{"kind":"Field","name":{"kind":"Name","value":"banReason"}},{"kind":"Field","name":{"kind":"Name","value":"banExpires"}},{"kind":"Field","name":{"kind":"Name","value":"systemRole"}},{"kind":"Field","name":{"kind":"Name","value":"membershipStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CurrentAdminQuery, CurrentAdminQueryVariables>;
export const GetMinistriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMinistries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ministries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MinistryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MinistryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ministry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"headId"}}]}}]} as unknown as DocumentNode<GetMinistriesQuery, GetMinistriesQueryVariables>;
export const GetMinistryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMinistry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ministry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MinistryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MinistryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ministry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"headId"}}]}}]} as unknown as DocumentNode<GetMinistryQuery, GetMinistryQueryVariables>;
export const CreateMinistryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMinistry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMinistryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMinistry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MinistryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MinistryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ministry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"headId"}}]}}]} as unknown as DocumentNode<CreateMinistryMutation, CreateMinistryMutationVariables>;
export const UpdateMinistryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMinistry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMinistryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMinistry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MinistryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MinistryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ministry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"headId"}}]}}]} as unknown as DocumentNode<UpdateMinistryMutation, UpdateMinistryMutationVariables>;
export const DeleteMinistryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMinistry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMinistry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteMinistryMutation, DeleteMinistryMutationVariables>;
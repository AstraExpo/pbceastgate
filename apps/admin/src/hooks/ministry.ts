import { ApolloSDK } from "@/graphql";
import { useMutation, useQuery } from "@apollo/client/react";

export function useGetMinistry(ministryId: string) {
  return useQuery(ApolloSDK.GetMinistryDocument, {
    variables: {
      id: ministryId,
    },
  });
}

export function useGetMinistries() {
  return useQuery(ApolloSDK.GetMinistriesDocument);
}

export function useCreateMinistry(input: ApolloSDK.CreateMinistryInput) {
  return useMutation(ApolloSDK.CreateMinistryDocument, {
    variables: {
      input,
    },
  });
}

export function useUpdateMinistry(input: ApolloSDK.UpdateMinistryInput) {
  return useMutation(ApolloSDK.UpdateMinistryDocument, {
    variables: {
      input,
    },
  });
}

export function useDeleteMinistry(ministryId: string) {
  return useMutation(ApolloSDK.DeleteMinistryDocument, {
    variables: {
      id: ministryId,
    },
  });
}

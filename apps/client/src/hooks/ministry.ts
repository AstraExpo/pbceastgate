import { ApolloSDK } from "@/graphql";
import { useQuery } from "@apollo/client/react";

export function useGetMinistry(ministryId: string) {
  const result = useQuery(ApolloSDK.GetMinistryDocument, {
    variables: { id: ministryId },
    skip: !ministryId,
  });

  return {
    ministry: result.data?.ministry ?? null,
    loading: result.loading,
    error: result.error,
    refetch: result.refetch,
  };
}

export function useGetMinistries() {
  const result = useQuery(ApolloSDK.GetMinistriesDocument);

  return {
    ministries: result.data?.ministries ?? [],
    loading: result.loading,
    error: result.error,
    refetch: result.refetch,
  };
}

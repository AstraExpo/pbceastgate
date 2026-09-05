import { useQuery } from "@apollo/client/react";
import { ApolloSDK } from "@/graphql";
import { AdminAuthContext } from "./auth/types";

export function useAdminAuth(): AdminAuthContext & {
  loading: boolean;
  error: Error | undefined;
  refetch: () => Promise<unknown>;
} {
  const result = useQuery(ApolloSDK.CurrentUserDocument, {
    fetchPolicy: "cache-and-network",
  });

  const user = result.data?.currentUser ?? null;

  if (result.loading && !result.data) {
    return {
      status: "loading",
      user: null,
      loading: true,
      error: result.error,
      refetch: result.refetch,
    };
  }

  if (!user) {
    return {
      status: "anonymous",
      user: null,
      loading: false,
      error: result.error,
      refetch: result.refetch,
    };
  }

  return {
    status: "authenticated",
    user,
    loading: false,
    error: result.error,
    refetch: result.refetch,
  };
}

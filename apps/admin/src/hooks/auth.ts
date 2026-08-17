import { ApolloSDK } from "@/graphql";
import { useMutation } from "@apollo/client/react";

export function useAuthenticateAdmin() {
  const [mutate, result] = useMutation(ApolloSDK.AuthenticateAdminDocument);
  return {
    authenticateAdmin: async () => {
      const result = await mutate();
      return result.data?.authenticateAdmin;
    },
    loading: result.loading,
    error: result.error,
  };
}

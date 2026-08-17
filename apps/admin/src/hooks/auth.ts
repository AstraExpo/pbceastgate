import { ApolloSDK } from "@/graphql";
import { useMutation } from "@apollo/client/react";

export function useAuthenticateAdmin() {
  const [mutate, result] = useMutation(ApolloSDK.AuthenticateAdminDocument);

  const authenticateAdmin = async () => {
    const mutationResult = await mutate();

    return {
      user: mutationResult.data?.authenticateAdmin ?? null,
    };
  };

  return {
    authenticateAdmin,
    loading: result.loading,
  };
}

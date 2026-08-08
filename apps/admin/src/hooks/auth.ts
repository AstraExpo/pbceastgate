import { ApolloSDK } from "@/graphql";

export function useAuthenticateAdmin() {
  const [mutate, { data, loading, error }] =
    ApolloSDK.useAuthenticateAdminMutation();

  const authenticateAdmin = async () => {
    const response = await (
      mutate as () => Promise<ApolloSDK.AuthenticateAdminMutationResult>
    )();

    return response.data?.authenticateAdmin;
  };

  return {
    authenticateAdmin,
    serverUser: data?.authenticateAdmin,
    serverLoading: loading,
    serverError: error,
  };
}

import { ApolloSDK } from "@/graphql";

export function useLoginWithFirebase() {
  const [AuthenticateAdminMutation, { loading, error }] =
    ApolloSDK.useAuthenticateAdminMutation();
  const authenticateAdmin = async (firebaseToken: string) => {
    const mutationVariables: ApolloSDK.AuthenticateAdminMutationVariables = {
      firebaseToken,
    };
    return AuthenticateAdminMutation({ variables: mutationVariables });
  };
  return { authenticateAdmin, loading, error };
}

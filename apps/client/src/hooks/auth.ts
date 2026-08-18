import { ApolloSDK } from "@/graphql";
import { useMutation } from "@apollo/client/react";

export function useAuthenticateCongregant() {
  const [mutate, result] = useMutation(
    ApolloSDK.AuthenticateCongregantDocument,
  );

  const authenticateCongregant = async () => {
    const mutationResult = await mutate();

    return {
      user: mutationResult.data?.authenticateCongregant ?? null,
    };
  };

  return {
    authenticateCongregant,
    loading: result.loading,
  };
}

export function useSignUpCongregant() {
  const [mutate, result] = useMutation(ApolloSDK.SignUpCongregantDocument);

  const signUpCongregant = async () => {
    const mutationResult = await mutate();

    return {
      user: mutationResult.data?.signUpCongregant ?? null,
    };
  };

  return {
    signUpCongregant,
    loading: result.loading,
  };
}

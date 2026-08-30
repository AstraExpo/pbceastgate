import { ApolloSDK } from "@/graphql";
import { clearSessionFn, signOutEverywhereFn } from "@/server/auth.function";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "@tanstack/react-router";
import { signOut as firebaseSignOut } from "@eastgate/auth/client";

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

export function useSignOutCongregant() {
  const router = useRouter();

  async function signOut(everywhere = false) {
    if (everywhere) {
      await signOutEverywhereFn();
    } else {
      await clearSessionFn();
    }

    await firebaseSignOut();

    await router.invalidate();

    await router.navigate({ to: "/logIn" });
  }

  return { signOut };
}

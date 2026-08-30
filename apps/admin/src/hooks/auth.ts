import { ApolloSDK } from "@/graphql";
import { clearSessionFn, signOutEverywhereFn } from "@/server/auth.function";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "@tanstack/react-router";
import { signOut as firebaseSignOut } from "@eastgate/auth/client";

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

export function useSignOutAdmin() {
  const router = useRouter();

  async function signOut(everywhere = false) {
    if (everywhere) {
      await signOutEverywhereFn();
    } else {
      await clearSessionFn();
    }

    await firebaseSignOut();

    await router.invalidate();

    await router.navigate({ to: "/login" });
  }

  return { signOut };
}

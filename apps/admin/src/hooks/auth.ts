import { ApolloSDK } from "@/graphql";
import { useAuth } from "@eastgate/auth";
import { useState } from "react";

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
    user: data?.authenticateAdmin,
    loading,
    error,
  };
}

export function useAdminAuth() {
  const firebaseAuth = useAuth();
  const { authenticateAdmin, loading: serverLoading } = useAuthenticateAdmin();
  const [isVerifyingServer, setIsVerifyingServer] = useState(false);

  const loginWithAdminCheck = async () => {
    setIsVerifyingServer(true);
    try {
      // 1. Firebase Popup
      await firebaseAuth.signInWithGoogle();

      // 2. NestJS Backend Sync & Role Check
      const response = await authenticateAdmin();
      if (!response) {
        throw new Error("Server authorization failed.");
      }

      return response;
    } catch (error) {
      // If server rejects or anything fails, purge Firebase session immediately
      await firebaseAuth.signOut();
      throw error;
    } finally {
      setIsVerifyingServer(false);
    }
  };

  return {
    ...firebaseAuth,
    loginWithAdminCheck,
    isVerifyingServer:
      firebaseAuth.loading || serverLoading || isVerifyingServer,
  };
}

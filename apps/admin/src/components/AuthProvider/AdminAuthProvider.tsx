import { useEffect, useState, ReactNode } from "react";
import {
  initializeFirebaseAuth,
  subscribeToAuthChanges,
  signInWithGoogle as firebaseGoogleSignIn,
  signInWithEmail as firebaseEmailSignIn,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from "@eastgate/auth";
import { useAuthenticateAdmin } from "@/hooks/auth";
import { adminEnv } from "@/config/admin.env";
import { AdminAuthContext } from "./auth.context";

initializeFirebaseAuth({
  apiKey: adminEnv.get("VITE_FIREBASE_API_KEY"),
  authDomain: adminEnv.get("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: adminEnv.get("VITE_FIREBASE_PROJECT_ID"),
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  const [isInitializing, setIsInitializing] = useState(true);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { authenticateAdmin, serverUser, serverError } = useAuthenticateAdmin();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async user => {
      setFirebaseUser(user);

      if (user) {
        try {
          const backendUser = await authenticateAdmin();

          if (
            !backendUser ||
            backendUser.systemRole !== "Admin" ||
            backendUser.banned
          ) {
            throw new Error(
              "Access denied. Admin privileges required or account banned.",
            );
          }
        } catch (e) {
          console.error("Admin verification failed on load", e);
          await firebaseSignOut();
          setFirebaseUser(null);
        }
      }
      setIsInitializing(false);
    });

    return () => unsubscribe();
  }, [authenticateAdmin]);

  const executeAuthFlow = async (
    firebaseAuthAction: () => Promise<unknown>,
  ) => {
    setIsAuthenticating(true);
    try {
      await firebaseAuthAction();

      const backendUser = await authenticateAdmin();

      if (!backendUser) {
        throw new Error(
          "Server authorization failed. Admin privileges required.",
        );
      }

      if (backendUser.banned) {
        throw new Error(
          `Account suspended: ${backendUser.banReason || "No reason provided"}`,
        );
      }
    } catch (error) {
      await firebaseSignOut();
      setFirebaseUser(null);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const loginWithGoogle = () => executeAuthFlow(firebaseGoogleSignIn);

  const loginWithEmail = (email: string, pass: string) =>
    executeAuthFlow(() => firebaseEmailSignIn(email, pass));

  const logout = async () => {
    await firebaseSignOut();
    setFirebaseUser(null);
  };

  const activeServerUser = firebaseUser ? serverUser : null;

  return (
    <AdminAuthContext.Provider
      value={{
        firebaseUser,
        serverUser: activeServerUser,
        isInitializing,
        isAuthenticating,
        serverError,
        loginWithGoogle,
        loginWithEmail,
        logout,
      }}
    >
      {isInitializing ? <div>Loading Eastgate Admin...</div> : children}
    </AdminAuthContext.Provider>
  );
}

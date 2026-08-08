import { createContext, useContext } from "react";
import { User as FirebaseUser } from "@eastgate/auth";
import { useAuthenticateAdmin } from "@/hooks/auth";

export interface AdminAuthContextType {
  firebaseUser: FirebaseUser | null;
  serverUser: ReturnType<typeof useAuthenticateAdmin>["serverUser"] | null;
  isInitializing: boolean;
  isAuthenticating: boolean;
  serverError: typeof useAuthenticateAdmin extends () => {
    serverError: infer E;
  }
    ? E
    : undefined;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined,
);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context)
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return context;
};

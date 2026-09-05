import { AuthStatus, User } from "@/graphql";
import type { ApolloClientIntegration } from "@apollo/client-integration-tanstack-start";

export interface AdminAuthContext {
  status: AuthStatus;
  user: User | null;
}

export type RouterContext = ApolloClientIntegration.RouterContext & {
  auth: AdminAuthContext;
};

export function isAuthenticated(auth: AdminAuthContext): boolean {
  return auth.status === "Authenticated";
}

export function isAdmin(auth: AdminAuthContext): boolean {
  return auth.status === "Authenticated" && auth.user?.systemRole === "Admin";
}

export function isSystem(auth: AdminAuthContext): boolean {
  return auth.status === "Authenticated" && auth.user?.systemRole === "System";
}

export function isEditor(auth: AdminAuthContext): boolean {
  return auth.status === "Authenticated" && auth.user?.systemRole === "Editor";
}

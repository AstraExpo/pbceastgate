import { ApolloSDK } from "@/graphql";
import type { ApolloClientIntegration } from "@apollo/client-integration-tanstack-start";

export interface AdminAuthUser extends Pick<
  ApolloSDK.UserFieldsFragment,
  | "id"
  | "firebaseUid"
  | "email"
  | "image"
  | "name"
  | "systemRole"
  | "membershipStatus"
  | "emailVerified"
> {}

export interface AdminAuthContext {
  status: "loading" | "authenticated" | "anonymous";
  user: AdminAuthUser | null;
}

export type RouterContext = ApolloClientIntegration.RouterContext & {
  auth: AdminAuthContext;
};

export function isAuthenticated(auth: AdminAuthContext): boolean {
  return auth.status === "authenticated";
}

export function isAdmin(auth: AdminAuthContext): boolean {
  return auth.status === "authenticated" && auth.user?.systemRole === "Admin";
}

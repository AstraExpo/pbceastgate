import { ApolloSDK } from "@/graphql";
import type { ApolloClientIntegration } from "@apollo/client-integration-tanstack-start";

export interface CongregantAuthUser extends Pick<
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

export interface CongregantAuthContext {
  status: "loading" | "authenticated" | "anonymous";
  user: CongregantAuthUser | null;
}

export type RouterContext = ApolloClientIntegration.RouterContext & {
  auth: CongregantAuthContext;
};

export function isAuthenticated(auth: CongregantAuthContext): boolean {
  return auth.status === "authenticated";
}

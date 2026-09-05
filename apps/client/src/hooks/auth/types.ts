import { AuthStatusResponse, SystemRole } from "@/graphql";
import type { ApolloClientIntegration } from "@apollo/client-integration-tanstack-start";

export type RouterContext = ApolloClientIntegration.RouterContext & {
  auth: AuthStatusResponse;
};

export function isAuthenticated(auth: AuthStatusResponse): boolean {
  return auth.status === "Authenticated";
}

export function isAdmin(auth: AuthStatusResponse) {
  return (
    auth.user?.systemRole === SystemRole.Admin ||
    SystemRole.Editor ||
    SystemRole.System
  );
}

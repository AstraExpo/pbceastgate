import { AuthStatusResponse } from "@/graphql";
import type { ApolloClientIntegration } from "@apollo/client-integration-tanstack-start";

export type RouterContext = ApolloClientIntegration.RouterContext & {
  auth: AuthStatusResponse;
};

export function isAuthenticated(auth: AuthStatusResponse): boolean {
  return auth.status === "Authenticated";
}

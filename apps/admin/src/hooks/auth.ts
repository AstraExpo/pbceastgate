import { ApolloSDK } from "@/graphql";
import { useMutation } from "@apollo/client/react";

export function useAuthenticateAdmin() {
  return useMutation(ApolloSDK.AuthenticateAdminDocument);
}

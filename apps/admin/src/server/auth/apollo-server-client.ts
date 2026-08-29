import { getCookie } from "@tanstack/react-start/server";
import { SetContextLink } from "@apollo/client/link/context";
import { createApolloClient } from "@eastgate/graphql/apollo";
import { SESSION_COOKIE_NAME } from "./constants";
import { serverEnv } from "../config/server.env";

export function createServerFnApolloClient() {
  const authLink = new SetContextLink(async prevContext => {
    const token = getCookie(SESSION_COOKIE_NAME);
    return {
      headers: {
        ...prevContext.headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return createApolloClient({
    uri: serverEnv.GRAPHQL_URL,
    authLink,
    isDevelopment: serverEnv.APP_ENV === "development",
    enableDevtools: serverEnv.APP_ENV === "development",
  });
}

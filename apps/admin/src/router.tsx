import { routerWithApolloClient } from "@apollo/client-integration-tanstack-start";
import { createRouter } from "@tanstack/react-router";
import { createApolloClient } from "@eastgate/graphql/apollo";
import { adminEnv } from "@/config/admin.env";
import { getToken } from "@eastgate/auth/client";
import { routeTree } from "./routeTree.gen";
import { createIsomorphicFn } from "@tanstack/react-start";
import { SetContextLink } from "@apollo/client/link/context";
import { handleGraphQLError } from "./lib/graphql-errors";
import { getCookie } from "@tanstack/react-start/server";
import { SESSION_COOKIE_NAME } from "./server/auth/constants";
import { AuthStatus } from "./graphql";

const createAuthLink = createIsomorphicFn()
  .server(() => {
    return new SetContextLink(async prevContext => {
      const token = getCookie(SESSION_COOKIE_NAME);
      return {
        headers: {
          ...prevContext.headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });
  })
  .client(() => {
    return new SetContextLink(async prevContext => {
      const token = await getToken();

      return {
        headers: {
          ...prevContext.headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });
  });

export function getRouter() {
  const apolloClient = createApolloClient({
    uri: adminEnv.get("VITE_GRAPHQL_URL"),
    authLink: createAuthLink(),
    isDevelopment: adminEnv.get("VITE_APP_ENV") === "development",
    enableDevtools: adminEnv.get("VITE_APP_ENV") === "development",
    onGraphQLError: handleGraphQLError,
  });

  const router = createRouter({
    routeTree,
    context: {
      ...routerWithApolloClient.defaultContext,
      auth: {
        status: AuthStatus.UnAuthenticated,
        user: null,
      },
    },
    scrollRestoration: true,
  });

  const wrappedRouter = routerWithApolloClient(router, apolloClient);

  return wrappedRouter;
}

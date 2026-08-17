import { routerWithApolloClient } from "@apollo/client-integration-tanstack-start";
import { createRouter } from "@tanstack/react-router";
import { createApolloClient } from "@eastgate/graphql/apollo";
import { adminEnv } from "@/config/admin.env";
import { getAuthToken } from "@eastgate/auth";
import { routeTree } from "./routeTree.gen";
import { createIsomorphicFn } from "@tanstack/react-start";
import { ApolloLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { handleGraphQLError } from "./lib/graphql-errors";

const createAuthLink = createIsomorphicFn()
  .server(() => {
    return new ApolloLink((operation, forward) => {
      return forward(operation);
    });
  })
  .client(() => {
    return new SetContextLink(async prevContext => {
      const token = await getAuthToken();

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

  console.log("[Apollo] client created:", apolloClient);

  const router = createRouter({
    routeTree,
    context: {
      ...routerWithApolloClient.defaultContext,
      auth: {
        status: "loading",
        user: null,
      },
    },
    scrollRestoration: true,
  });

  const wrappedRouter = routerWithApolloClient(router, apolloClient);

  console.log("[Apollo] router wrapped:", wrappedRouter);

  return wrappedRouter;
}

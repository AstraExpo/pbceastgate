import { clientEnv } from "@/config/client.env";
import {
  ApolloLink,
  InMemoryCache,
  ApolloClient,
  HttpLink,
  CombinedGraphQLErrors,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { createIsomorphicFn } from "@tanstack/react-start";

// Load development tracking bundles strictly in browser development environments
if (clientEnv.get("VITE_APP_ENV") === "development" && !clientEnv.isServer) {
  import("@apollo/client/dev").then(
    ({ loadDevMessages, loadErrorMessages }) => {
      loadErrorMessages();
      loadDevMessages();
    },
  );
}

// Global exception and network fault logger
const errorLink = new ErrorLink(({ error }) => {
  if (error) {
    if (CombinedGraphQLErrors.is(error)) {
      error.errors.forEach(({ message, locations, path }) =>
        console.error(
          `[GraphQL Fault]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    } else {
      console.error(`[Network Exception]: ${error.message}`);
    }
  }
});

// Isomorphic link separating browser storage tracking from server-side rendering execution
const createAuthLink = createIsomorphicFn()
  .server(() => {
    return new ApolloLink((operation, forward) => forward(operation));
  })
  .client(() => {
    return new ApolloLink((operation, forward) => {
      const token = localStorage.getItem("auth_token");
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      }));
      return forward(operation);
    });
  });

    const httpLink = new HttpLink({
    uri: clientEnv.get("VITE_GRAPHQL_URL"),
  });

// --- Apollo Client instance ---
export const apolloClient = new ApolloClient({
    ssrMode: clientEnv.isServer,
    cache: new InMemoryCache(),
    link: ApolloLink.from([createAuthLink(), errorLink, httpLink]),
    defaultOptions: {
      watchQuery: { errorPolicy: "all" },
      query: { errorPolicy: "all" },
      mutate: { errorPolicy: "all" },
    },
    devtools: { enabled: clientEnv.get("VITE_APP_ENV") === "development" },
  });
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
import { SetContextLink } from "@apollo/client/link/context";
import { getToken } from "@eastgate/auth/client";

if (clientEnv.get("VITE_APP_ENV") === "development" && !clientEnv.isServer) {
  import("@apollo/client/dev").then(
    ({ loadDevMessages, loadErrorMessages }) => {
      loadErrorMessages();
      loadDevMessages();
    },
  );
}

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

const createAuthLink = createIsomorphicFn()
  .server(() => {
    return new ApolloLink((operation, forward) => forward(operation));
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

const debugLink = new ApolloLink((operation, forward) => {
  console.log("📡 [Apollo Outgoing Request]:", operation.operationName);
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: clientEnv.get("VITE_GRAPHQL_URL"),
});

export const apolloClient = new ApolloClient({
  ssrMode: clientEnv.isServer,
  cache: new InMemoryCache(),
  link: ApolloLink.from([createAuthLink(), debugLink, errorLink, httpLink]),
  defaultOptions: {
    watchQuery: { errorPolicy: "all" },
    query: { errorPolicy: "all" },
    mutate: { errorPolicy: "all" },
  },
  devtools: { enabled: clientEnv.get("VITE_APP_ENV") === "development" },
});

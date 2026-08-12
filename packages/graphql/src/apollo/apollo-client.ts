import "./default-options.js";

import { ApolloLink, CombinedGraphQLErrors, HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-tanstack-start";
import { ErrorLink } from "@apollo/client/link/error";

export interface CreateApolloClientOptions {
  uri: string;
  authLink?: ApolloLink;
  isDevelopment?: boolean;
  enableDevtools?: boolean;
}

export function createApolloClient(options: CreateApolloClientOptions) {
  const {
    uri,
    authLink,
    isDevelopment = false,
    enableDevtools = false,
  } = options;

  const authenticationLink =
    authLink ??
    new ApolloLink((operation, forward) => {
      return forward(operation);
    });

  const errorLink = new ErrorLink(({ error }) => {
    if (!error) {
      return;
    }

    if (CombinedGraphQLErrors.is(error)) {
      for (const graphQLError of error.errors) {
        console.error("[GraphQL Fault]", graphQLError);
      }
    } else {
      console.error("[Network Exception]", error);
    }
  });

  const debugLink = isDevelopment
    ? new ApolloLink((operation, forward) => {
        console.debug("📡 [Apollo]", operation.operationName);

        return forward(operation);
      })
    : new ApolloLink((operation, forward) => {
        return forward(operation);
      });

  const httpLink = new HttpLink({
    uri,
  });

  const link = ApolloLink.from([
    authenticationLink,
    debugLink,
    errorLink,
    httpLink,
  ]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all",
      },
      query: {
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
    devtools: {
      enabled: enableDevtools,
    },
  });
}

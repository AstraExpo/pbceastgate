import "./default-options.js";

import { ApolloLink, CombinedGraphQLErrors, HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-tanstack-start";
import { ErrorLink } from "@apollo/client/link/error";

export interface GraphQLClientError {
  message: string;
  code?: string;
  statusCode?: number;
}

export interface CreateApolloClientOptions {
  uri: string;
  authLink?: ApolloLink;
  isDevelopment?: boolean;
  enableDevtools?: boolean;
  onGraphQLError?: (error: GraphQLClientError) => void;
  onNetworkError?: (error: Error) => void;
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

        options.onGraphQLError?.({
          message: graphQLError.message,
          code:
            typeof graphQLError.extensions?.code === "string"
              ? graphQLError.extensions.code
              : undefined,
          statusCode:
            typeof graphQLError.extensions?.statusCode === "number"
              ? graphQLError.extensions.statusCode
              : undefined,
        });
      }

      return;
    }

    console.error("[Network Exception]", error);

    if (error instanceof Error) {
      options.onNetworkError?.(error);
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
        fetchPolicy: "cache-and-network",
      },
      query: {
        errorPolicy: "all",
        fetchPolicy: "cache-first",
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

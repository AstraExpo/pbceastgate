import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "./../styles/styles.css?url";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "../constant/apollo-client/client";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "TanStack Start Starter" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFoundLayout,
});

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ApolloProvider client={apolloClient}>
          <Outlet />
        </ApolloProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundLayout() {
  return (
    <main className="min-h-dvh w-screen flex items-center justify-center flex-col gap-y-4 p-4 text-center">
      <h1>404 - Resource Not Found</h1>
      <p>The requested page does not exist or has been moved.</p>
      <a
        className="bg-foreground text-background rounded-full px-4 py-1 hover:opacity-90 text-sm"
        href="/"
      >
        Go Home
      </a>
    </main>
  );
}

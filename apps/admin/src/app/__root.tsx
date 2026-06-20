import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "./../styles/styles.css?url";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "../constant/apollo-client/client";
import { ThemeProvider } from "@eastgate/ui/theme/ThemeProvider.js";
import { getThemeFromCookie } from "@/server/theme.server";

export const Route = createRootRoute({
  loader: async () => {
    return await getThemeFromCookie();
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "PBC EastGate Admin" },
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
  const { theme } = Route.useLoaderData();
  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme} storageKey="eastgate-admin-theme">
          <ApolloProvider client={apolloClient}>
            <Outlet />
          </ApolloProvider>
        </ThemeProvider>
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

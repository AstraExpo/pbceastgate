import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "./../styles/styles.css?url";
import { getThemeFromCookie } from "@/server/theme.function";
import { ThemeProvider } from "@eastgate/ui/theme/ThemeProvider.js";
import { Toaster } from "@eastgate/ui/components/sonner";
import "@/lib/firebase";
import { RouterContext } from "@/hooks/auth/types";
import { getCurrentCongregantFn } from "@/server/auth.function";
import { SessionSync } from "@/components/session-sync";

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const auth = await getCurrentCongregantFn();

    return {
      auth,
    };
  },
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
      { title: "PBC EastGate" },
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
        <ThemeProvider defaultTheme={theme} storageKey="eastgate-client-theme">
          <SessionSync />
          <Outlet />
          <Toaster />
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

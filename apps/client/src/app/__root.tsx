import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "./../styles/styles.css?url";
import { Toaster } from "@eastgate/ui/components/sonner";
import "@/lib/firebase";
import { RouterContext } from "@/hooks/auth/types";
import { getCurrentUserFn } from "@/server/auth.function";
import { SessionSync } from "@/components/session-sync";
import {
  getPreferencesFn,
  setPreferencesFn,
} from "@/server/preferences.function";
import { AuthStatus } from "@/graphql";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const auth = await getCurrentUserFn();

    return {
      auth,
    };
  },
  loader: async ({ context }) => {
    const cookiePrefs = await getPreferencesFn();
    if (
      context.auth.status === AuthStatus.Authenticated &&
      context.auth.user.theme &&
      context.auth.user.theme !== cookiePrefs.theme
    ) {
      return await setPreferencesFn({
        data: { theme: context.auth.user.theme },
      });
    }
    return cookiePrefs;
  },
  // loader: async () => {
  //   return await getThemeFromCookie();
  // },
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
    scripts: [
      {
        children: `
          (function () {
            try {
              var match = document.cookie.match(/eastgate_preferences=([^;]+)/);
              var theme = "system";
              if (match) {
                var prefs = JSON.parse(decodeURIComponent(match[1]));
                theme = prefs.theme || "system";
              }
              var resolved = theme === "system"
                ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
                : theme;
              document.documentElement.classList.add(resolved);
            } catch (e) {
              document.documentElement.classList.add("light");
            }
          })();
        `,
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFoundLayout,
});

function RootLayout() {
  const { theme } = Route.useLoaderData();
  const initialClass =
    theme === "dark" ? "dark" : theme === "light" ? "light" : "light";

  const { auth } = Route.useRouteContext();
  const isAuthenticated = auth.status === AuthStatus.Authenticated;
  return (
    <html lang="en" className={initialClass}>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme} isAuthenticated={isAuthenticated}>
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

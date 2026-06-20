import * as React from "react";
import { Theme, ThemeProviderContext } from "./useTheme";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "eastgate-theme",
  ...props
}: ThemeProviderProps) {
  // Initialize state with the server-passed cookie evaluation
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);

  // 1. Sync storage intent, override stale cookies, and listen to active OS shifts
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Fallback explicitly to "system" if localStorage has not been explicitly set
    const storedTheme =
      (localStorage.getItem(storageKey) as Theme | null) || "system";

    // Align local React state to the user's underlying preference intent
    if (storedTheme !== theme) {
      setThemeState(storedTheme);
    }

    // Recalculate system theme and force-overwrite the cookie to correct server state
    const getSystemTheme = () =>
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    const resolved = storedTheme === "system" ? getSystemTheme() : storedTheme;
    document.cookie = `${storageKey}=${resolved}; path=/; max-age=31536000; SameSite=Lax`;

    // Establish event listener for real-time operating system switches
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      const currentIntent =
        (localStorage.getItem(storageKey) as Theme | null) || "system";
      // Only execute updates if the user is currently tracking the system environment
      if (currentIntent === "system") {
        const nextSystemTheme = mediaQuery.matches ? "dark" : "light";

        // Manipulate DOM tokens immediately
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(nextSystemTheme);

        // Sync the cookie state for the subsequent server execution loops
        document.cookie = `${storageKey}=${nextSystemTheme}; path=/; max-age=31536000; SameSite=Lax`;
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [storageKey, theme]);

  // 2. DOM Class Sync: Controls presentation mapping for standard state modifications
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // 3. User Mutator Handler: Intercepts programmatic changes and partitions data slots
  const setTheme = (nextTheme: Theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, nextTheme);

      const resolved =
        nextTheme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : nextTheme;

      document.cookie = `${storageKey}=${resolved}; path=/; max-age=31536000; SameSite=Lax`;
    }
    setThemeState(nextTheme);
  };

  return (
    <ThemeProviderContext.Provider {...props} value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// The current setup handles local, device-specific persistence perfectly. However, it cannot automatically resolve an authenticated user's database preference across different devices without modifying your routing architecture.

// What the Current Setup Handles Perfectly Right Now
// First-Time Visitors: They have no localStorage and no cookie. The code defaults them to "system", evaluates their OS mode, applies the correct styles instantly to prevent a flash, and attaches the live listener to track changes.

// Returning Users (Same Device): If an unauthenticated user manually selects "Light" or "Dark", it saves to localStorage. On subsequent visits, the client state aligns with this choice and ignores the system theme.

// Why Authenticated Preferences Require a Future To-Do
// If an authenticated user sets their preference to "Light" on a desktop, that preference lives in your database. If that same user later logs into your app from a brand-new mobile device:

// The mobile device has an empty localStorage and no cookie.

// Your current server function (getThemeFromCookie) will look for a cookie, find nothing, and default to "system".

// The server will render the site using the mobile device's system theme.

// Even after the TanStack Start hydration completes, the app still has no way of knowing the user wants "Light" because the database profile has not been queried or injected into the theme lifecycle.

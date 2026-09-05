import {
  readPreferencesClient,
  writePreferencesClient,
} from "@/lib/preferences";
import { ThemeProviderContext } from "./useTheme";
import { useEffect, useState } from "react";
import { UserTheme } from "@/graphql/generated/client.graphql";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: UserTheme;
  isAuthenticated?: boolean;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  isAuthenticated = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<UserTheme>(defaultTheme);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = readPreferencesClient().theme ?? "system";
    if (stored !== theme) setThemeState(stored);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (readPreferencesClient().theme === "system") {
        const next = mediaQuery.matches ? "dark" : "light";
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(next);
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    const resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    root.classList.add(resolved);
  }, [theme]);

  const setTheme = (nextTheme: UserTheme) => {
    writePreferencesClient({ theme: nextTheme });
    setThemeState(nextTheme);
    // TODO: Add the user theme preference mutation to update the db settings for the user theme preference
    if (isAuthenticated) {
      // updateThemePreferenceMutation({ variables: { theme: nextTheme } }); // fire-and-forget, syncs other devices
    }
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

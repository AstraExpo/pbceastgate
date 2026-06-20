import { Theme } from "@eastgate/ui/theme/useTheme.js";
import { createServerFn } from "@tanstack/react-start";
import { extractThemeFromSessionCookie } from "./theme.server";

/**
 * RPC endpoint entry point. Safe to import and call in client components
 * or route loaders like __root.tsx.
 */
export const getThemeFromCookie = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ theme: Theme }> => {
    const theme = await extractThemeFromSessionCookie();
    return { theme };
  }
);
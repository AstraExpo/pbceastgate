import { Theme } from "@eastgate/ui/theme/useTheme.js";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

export const getThemeFromCookie = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ theme: Theme }> => {
    const request = getRequest();
    const cookieHeader = request?.headers.get("cookie") || "";
    
    const match = cookieHeader.match(/eastgate-client-theme=([^;]+)/);
    const rawTheme = match ? match[1] : "system";
    
    // Type guard validation block to avoid 'any' or unsafe casting
    const theme: Theme = 
      rawTheme === "dark" || rawTheme === "light" || rawTheme === "system"
        ? (rawTheme as Theme)
        : "system";
    
    return { theme };
  }
);
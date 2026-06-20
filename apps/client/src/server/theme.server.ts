import { Theme } from "@eastgate/ui/theme/useTheme.js";
import { getRequest } from "@tanstack/react-start/server";

/**
 * Direct server-side environment extraction of the theme cookie.
 * This function can only be safely executed inside a server boundary.
 */
export async function extractThemeFromSessionCookie(): Promise<Theme> {
  const request = getRequest();
  const cookieHeader = request?.headers.get("cookie") || "";
  
  const match = cookieHeader.match(/eastgate-client-theme=([^;]+)/);
  const rawTheme = match ? match[1] : "system";
  
  const theme: Theme = 
    rawTheme === "dark" || rawTheme === "light" || rawTheme === "system"
      ? (rawTheme as Theme)
      : "system";
      
  return theme;
}
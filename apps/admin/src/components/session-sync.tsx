import { clearSessionFn, createSessionFn } from "@/server/auth.function";
import { getToken, subscribeToIdTokenChanges } from "@eastgate/auth/client";
import { useEffect } from "react";

export function SessionSync() {
  useEffect(() => {
    return subscribeToIdTokenChanges(async user => {
      if (user) {
        const idToken = await getToken(true); // force-fresh, per createSessionCookie's 5-min window
        if (idToken) {
          await createSessionFn({ data: { idToken } });
        }
      } else {
        await clearSessionFn();
      }
    });
  }, []);

  return null;
}

import { AuthStatus } from "@/graphql";
import { AdminAuthContext } from "@/hooks/auth/types";

export async function getCurrentAdmin(): Promise<AdminAuthContext> {
  return {
    status: AuthStatus.UnAuthenticated,
    user: null,
  };
}

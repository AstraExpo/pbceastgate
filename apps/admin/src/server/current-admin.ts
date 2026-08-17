import { AdminAuthContext } from "@/hooks/auth/types";

export async function getCurrentAdmin(): Promise<AdminAuthContext> {
  return {
    status: "anonymous",
    user: null,
  };
}

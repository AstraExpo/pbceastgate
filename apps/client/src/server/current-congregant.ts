import { CongregantAuthContext } from "@/hooks/auth/types";

export async function getCurrentCongregant(): Promise<CongregantAuthContext> {
  return {
    status: "anonymous",
    user: null,
  };
}

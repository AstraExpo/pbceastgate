import { AdminAuthContext } from "@/hooks/auth/types";
import { createServerFn } from "@tanstack/react-start";
import { getCurrentAdmin } from "./current-admin";

export const getCurrentAdminFn = createServerFn({
  method: "GET",
}).handler(async (): Promise<AdminAuthContext> => {
  return getCurrentAdmin();
});

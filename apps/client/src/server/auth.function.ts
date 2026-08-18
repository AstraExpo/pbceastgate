import { CongregantAuthContext } from "@/hooks/auth/types";
import { createServerFn } from "@tanstack/react-start";
import { getCurrentCongregant } from "./current-congregant";

export const getCurrentCongregantFn = createServerFn({
  method: "GET",
}).handler(async (): Promise<CongregantAuthContext> => {
  return getCurrentCongregant();
});

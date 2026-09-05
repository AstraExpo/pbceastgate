import { UserTheme } from "@/graphql/generated/client.graphql";

export const PREFERENCES_COOKIE_NAME = "eastgate_preferences";
export const PREFERENCES_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export interface Preferences {
  theme: UserTheme;
  viewMode?: "admin" | "congregant";
}

export const DEFAULT_PREFERENCES: Preferences = {
  theme: "system",
};

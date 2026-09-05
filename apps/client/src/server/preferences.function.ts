import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import {
  PREFERENCES_COOKIE_NAME,
  PREFERENCES_MAX_AGE_SECONDS,
  DEFAULT_PREFERENCES,
  type Preferences,
} from "./preference/constant";

function parsePreferences(raw: string | undefined): Preferences {
  if (!raw) return DEFAULT_PREFERENCES;
  try {
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export const getPreferencesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return parsePreferences(getCookie(PREFERENCES_COOKIE_NAME));
  },
);

export const setPreferencesFn = createServerFn({ method: "POST" })
  .validator((data: Partial<Preferences>) => data)
  .handler(async ({ data }) => {
    const current = parsePreferences(getCookie(PREFERENCES_COOKIE_NAME));
    const updated = { ...current, ...data };

    setCookie(PREFERENCES_COOKIE_NAME, JSON.stringify(updated), {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: PREFERENCES_MAX_AGE_SECONDS,
    });

    return updated;
  });

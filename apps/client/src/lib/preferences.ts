import {
  DEFAULT_PREFERENCES,
  type Preferences,
  PREFERENCES_COOKIE_NAME,
} from "@/server/preference/constant";

import { createIsomorphicFn } from "@tanstack/react-start";

export const readPreferencesClient = createIsomorphicFn()
  .client((): Preferences => {
    const match = document.cookie.match(
      new RegExp(`${PREFERENCES_COOKIE_NAME}=([^;]+)`),
    );
    if (!match) return DEFAULT_PREFERENCES;
    try {
      return {
        ...DEFAULT_PREFERENCES,
        ...JSON.parse(decodeURIComponent(match[1])),
      };
    } catch {
      return DEFAULT_PREFERENCES;
    }
  })
  .server((): Preferences => DEFAULT_PREFERENCES);

export const writePreferencesClient = createIsomorphicFn()
  .client((patch: Partial<Preferences>): Preferences => {
    const updated = { ...readPreferencesClient(), ...patch };
    document.cookie = `${PREFERENCES_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(updated))}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    return updated;
  })
  .server((): Preferences => DEFAULT_PREFERENCES);

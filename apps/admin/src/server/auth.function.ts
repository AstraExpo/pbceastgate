// import { AdminAuthContext } from "@/hooks/auth/types";
// import { createServerFn } from "@tanstack/react-start";
// import { getCurrentAdmin } from "./current-admin";

// export const getCurrentAdminFn = createServerFn({
//   method: "GET",
// }).handler(async (): Promise<AdminAuthContext> => {
//   return getCurrentAdmin();
// });

import "./firebase.admin";
import { createServerFn } from "@tanstack/react-start";
import {
  setCookie,
  deleteCookie,
  getCookie,
} from "@tanstack/react-start/server";
import {
  createSessionCookie,
  verifySessionCookie,
  revokeUserSessions,
} from "@eastgate/auth/admin";
import { createServerFnApolloClient } from "./auth/apollo-server-client";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "./auth/constants";
import { ApolloSDK, AuthStatus } from "@/graphql";

export const createSessionFn = createServerFn({ method: "POST" })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const sessionCookie = await createSessionCookie(
      data.idToken,
      SESSION_MAX_AGE_SECONDS * 1000,
    );

    setCookie(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return { ok: true };
  });

export const clearSessionFn = createServerFn({ method: "POST" }).handler(
  async () => {
    deleteCookie(SESSION_COOKIE_NAME);
    return { ok: true };
  },
);

export const signOutEverywhereFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const sessionCookie = getCookie(SESSION_COOKIE_NAME);
    if (sessionCookie) {
      const decoded = await verifySessionCookie(sessionCookie);
      await revokeUserSessions(decoded.uid);
    }
    deleteCookie(SESSION_COOKIE_NAME);
    return { ok: true };
  },
);

export const getCurrentAdminFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const sessionCookie = getCookie(SESSION_COOKIE_NAME);
    if (!sessionCookie) {
      return { status: AuthStatus.UnAuthenticated, user: null };
    }

    const decoded = await verifySessionCookie(sessionCookie).catch(() => null);
    if (!decoded) {
      return { status: AuthStatus.UnAuthenticated, user: null };
    }

    const client = createServerFnApolloClient();
    const { data, error } = await client.query({
      query: ApolloSDK.CurrentAdminDocument,
    });

    if (error) throw error;

    if (
      data?.currentAdmin.status === AuthStatus.Authenticated &&
      data?.currentAdmin.user
    ) {
      return { status: data.currentAdmin.status, user: data.currentAdmin.user };
    }

    return { status: AuthStatus.UnAuthenticated, user: null };
  },
);

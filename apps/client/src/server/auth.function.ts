import { createServerFn } from "@tanstack/react-start";
import {
  setCookie,
  deleteCookie,
  getCookie,
} from "@tanstack/react-start/server";
import { createServerFnApolloClient } from "./auth/apollo-server-client";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "./auth/constants";
import { ApolloSDK, AuthStatus } from "@/graphql";

async function getFirebaseAdminAuth() {
  await import("./firebase.admin");
  return import("@eastgate/auth/admin");
}

export const createSessionFn = createServerFn({ method: "POST" })
  .validator((data: { idToken: string }) => data)
  .handler(async ({ data }) => {
    const { createSessionCookie } = await getFirebaseAdminAuth();
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
      const { verifySessionCookie, revokeUserSessions } =
        await getFirebaseAdminAuth();
      const decoded = await verifySessionCookie(sessionCookie).catch(
        () => null,
      );
      if (decoded) {
        await revokeUserSessions(decoded.uid);
      }
    }
    deleteCookie(SESSION_COOKIE_NAME);
    return { ok: true };
  },
);

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const sessionCookie = getCookie(SESSION_COOKIE_NAME);
    if (!sessionCookie) {
      return { status: AuthStatus.UnAuthenticated, user: null };
    }

    const { verifySessionCookie } = await getFirebaseAdminAuth();

    const decoded = await verifySessionCookie(sessionCookie).catch(() => null);

    if (!decoded) {
      return { status: AuthStatus.UnAuthenticated, user: null };
    }

    const client = createServerFnApolloClient();

    const { data, error } = await client.query({
      query: ApolloSDK.CurrentUserDocument,
    });

    if (error) throw error;

    if (
      data?.currentUser.status === AuthStatus.Authenticated &&
      data?.currentUser.user
    ) {
      return {
        status: data.currentUser.status,
        user: data.currentUser.user,
      };
    }

    return { status: AuthStatus.UnAuthenticated, user: null };
  },
);

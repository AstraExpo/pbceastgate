import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

if (typeof window !== "undefined") {
  throw new Error(
    "@eastgate/auth/admin must never run in the browser. Import it only " +
      "from TanStack Start server functions or the NestJS server.",
  );
}

export interface FirebaseAdminConfig {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

export function initializeFirebaseAdmin(
  config: FirebaseAdminConfig,
): App | undefined {
  const apps = getApps();
  if (apps.length > 0) return apps[0];

  return initializeApp({
    credential: cert({
      projectId: config.projectId,
      clientEmail: config.clientEmail,
      privateKey: config.privateKey,
    }),
  });
}

export function getAdminAuthInstance(): Auth {
  const apps = getApps();
  if (apps.length === 0) {
    throw new Error(
      "Firebase Admin has not been initialized. Call initializeFirebaseAdmin() first.",
    );
  }
  return getAuth(apps[0]);
}

export async function verifyIdToken(idToken: string) {
  return getAdminAuthInstance().verifyIdToken(idToken);
}

export async function createSessionCookie(
  idToken: string,
  expiresInMs: number,
) {
  return getAdminAuthInstance().createSessionCookie(idToken, {
    expiresIn: expiresInMs,
  });
}

export async function verifySessionCookie(
  sessionCookie: string,
  checkRevoked = false,
) {
  return getAdminAuthInstance().verifySessionCookie(
    sessionCookie,
    checkRevoked,
  );
}

export async function revokeUserSessions(uid: string) {
  return getAdminAuthInstance().revokeRefreshTokens(uid);
}

export type {
  Auth,
  AuthErrorCode,
  SessionCookieOptions,
} from "firebase-admin/auth";
export type {
  App,
  AppErrorCode,
  AppOptions,
  FirebaseError,
  ErrorInfo,
  FirebaseAppError,
  FirebaseArrayIndexError,
  Credential,
} from "firebase-admin/app";

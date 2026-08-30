import { initializeApp, getApps, type FirebaseOptions } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
  type Auth,
  type Unsubscribe,
  OAuthProvider,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
} from "firebase/auth";

export function initializeFirebaseAuth(config: FirebaseOptions): Auth {
  const app = getApps().length > 0 ? getApps()[0] : initializeApp(config);

  return getAuth(app);
}

export function getAuthInstance(): Auth {
  const apps = getApps();

  if (apps.length === 0) {
    throw new Error(
      "Firebase Auth has not been initialized. Call initializeFirebaseAuth() first.",
    );
  }

  return getAuth(apps[0]);
}

export function getCurrentUser(): User | null {
  return getAuthInstance().currentUser;
}

export async function signInWithGoogle() {
  return signInWithPopup(getAuthInstance(), new GoogleAuthProvider());
}

export async function signInWithGithub() {
  return signInWithPopup(getAuthInstance(), new GithubAuthProvider());
}

export async function signInWithFacebook() {
  return signInWithPopup(getAuthInstance(), new FacebookAuthProvider());
}

export async function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(getAuthInstance(), email, password);
}

export async function createUserWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(getAuthInstance(), email, password);
}

export async function signInWithTwitter() {
  return signInWithPopup(getAuthInstance(), new TwitterAuthProvider());
}

export async function signInWithApple() {
  const provider = new OAuthProvider("apple.com");
  return signInWithPopup(getAuthInstance(), provider);
}

export async function signInWithMicrosoft() {
  const provider = new OAuthProvider("microsoft.com");
  return signInWithPopup(getAuthInstance(), provider);
}

export async function sendPasswordReset(email: string) {
  return sendPasswordResetEmail(getAuthInstance(), email);
}

export async function verifyPasswordReset(actionCode: string) {
  return verifyPasswordResetCode(getAuthInstance(), actionCode);
}

export async function confirmPasswordResetAction(
  actionCode: string,
  newPassword: string,
) {
  return confirmPasswordReset(getAuthInstance(), actionCode, newPassword);
}

export async function signOut() {
  await firebaseSignOut(getAuthInstance());
}

export async function getToken(forceRefresh = false): Promise<string | null> {
  const user = getCurrentUser();
  if (!user) {
    return null;
  }
  return user.getIdToken(forceRefresh);
}

export function subscribeToIdTokenChanges(
  callback: (user: User | null) => void,
): Unsubscribe {
  return onIdTokenChanged(getAuthInstance(), callback);
}

export function subscribeToAuthChanges(
  callback: (user: User | null) => void,
): Unsubscribe {
  return onAuthStateChanged(getAuthInstance(), callback);
}

export type {
  User,
  Auth,
  Unsubscribe,
  AuthError,
  AuthErrorCodes,
  UserCredential,
} from "firebase/auth";
export type { FirebaseOptions, FirebaseError } from "firebase/app";
export { AuthProvider, useAuth } from "./auth-provider.js";

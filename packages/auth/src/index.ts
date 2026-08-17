import { initializeApp, getApps, FirebaseOptions } from "firebase/app";
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
  User,
} from "firebase/auth";

export const initializeFirebaseAuth = (config: FirebaseOptions) => {
  const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
  return getAuth(app);
};

const getAuthInstance = () => {
  const apps = getApps();
  if (apps.length === 0)
    throw new Error(
      "Firebase not initialized. Call initializeFirebaseAuth first.",
    );
  return getAuth(apps[0]);
};

export const signInWithGoogle = async () => {
  const auth = getAuthInstance();
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const signInWithEmail = async (email: string, password: string) => {
  const auth = getAuthInstance();
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  const auth = getAuthInstance();
  await firebaseSignOut(auth);
};

export const getToken = async () => {
  const auth = getAuthInstance();
  if (!auth.currentUser) return null;
  return await auth.currentUser.getIdToken();
};

export const subscribeToAuthChanges = (
  callback: (user: User | null) => void,
) => {
  const auth = getAuthInstance();
  return onAuthStateChanged(auth, callback);
};

export { AuthProvider, useAuth } from "./auth-provider.js";
export type { User } from "firebase/auth";
export { getAuthToken } from "./helper.js";

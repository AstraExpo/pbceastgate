import { clientEnv } from "@/config/client.env";
import { initializeFirebaseAuth } from "@eastgate/auth/client";

export const firebaseAuth = initializeFirebaseAuth({
  apiKey: clientEnv.get("VITE_FIREBASE_API_KEY"),
  authDomain: clientEnv.get("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: clientEnv.get("VITE_FIREBASE_PROJECT_ID"),
});

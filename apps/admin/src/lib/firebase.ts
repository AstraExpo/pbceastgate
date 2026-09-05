import { adminEnv } from "@/config/admin.env";
import { initializeFirebaseAuth } from "@eastgate/auth/client";

export const firebaseAuth = initializeFirebaseAuth({
  apiKey: adminEnv.get("VITE_FIREBASE_API_KEY"),
  authDomain: adminEnv.get("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: adminEnv.get("VITE_FIREBASE_PROJECT_ID"),
});

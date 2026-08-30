import { initializeFirebaseAdmin } from "@eastgate/auth/admin";
import { serverEnv } from "./config/server.env";

initializeFirebaseAdmin({
  projectId: serverEnv.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: serverEnv.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: serverEnv.FIREBASE_ADMIN_PRIVATE_KEY,
});

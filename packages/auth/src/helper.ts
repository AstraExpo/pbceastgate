import { getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

export async function getAuthToken(): Promise<string | null> {
  const apps = getApps();
  if (apps.length === 0) return null;

  const auth = getAuth(apps[0]);
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  return await currentUser.getIdToken();
}

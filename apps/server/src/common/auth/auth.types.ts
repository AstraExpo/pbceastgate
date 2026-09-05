import { User } from "@/generated/prisma/client";
import { DecodedIdToken } from "firebase-admin/auth";

export interface AuthContext {
  authenticated: boolean;
  firebaseUser: DecodedIdToken | null;
  user: User | null;
  method: "bearer" | "session" | "anonymous";
}

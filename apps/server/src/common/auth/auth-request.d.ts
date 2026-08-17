import { DecodedIdToken } from "firebase-admin/auth";
import { User } from "@/generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      firebaseUser?: DecodedIdToken | null;
      user?: User | null;
      auth?: {
        authenticated: boolean;
        firebaseUser: DecodedIdToken | null;
        user: User | null;
        method: "bearer" | "session" | "anonymous";
      };
    }
  }
}

export {};

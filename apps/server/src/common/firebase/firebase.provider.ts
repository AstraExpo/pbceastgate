import { initializeApp, cert } from "firebase-admin/app";
import { AppConfigService } from "../config/app-config.service";

export function initializeFirebaseAdmin(configService: AppConfigService): void {
  const { projectId, clientEmail, privateKey } = configService.firebase;
  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

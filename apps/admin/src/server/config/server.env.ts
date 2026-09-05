import { z } from "zod";

const ServerEnvSchema = z.object({
  FIREBASE_ADMIN_PROJECT_ID: z
    .string()
    .min(1, "Firebase Admin project ID is missing"),
  FIREBASE_ADMIN_CLIENT_EMAIL: z
    .string()
    .min(1, "Firebase Admin client email is missing"),
  FIREBASE_ADMIN_PRIVATE_KEY: z
    .string()
    .min(1, "Firebase Admin private key is missing"),
  APP_ENV: z.string().min(1, "App env is missing"),
  APP_BASE_URL: z.string().min(1, "App base url is missing"),
  API_URL: z.string().min(1, "App api url is missing"),
  GRAPHQL_URL: z.string().min(1, "App gql url is missing"),
  SUBSCRIPTION_URL: z.string().min(1, "WS subscriptions url is missing"),
});
const validationResult = ServerEnvSchema.safeParse(process.env);

if (!validationResult.success) {
  console.error(
    "❌ Server environment validation failed:",
    validationResult.error.format(),
  );
  throw new Error(
    "Execution halted: server environment schema verification failed.",
  );
}

export const serverEnv = validationResult.data;

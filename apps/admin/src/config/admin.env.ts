/// <reference types="vite/client" />
import { z } from "zod";

enum EnvMode {
  Development = "development",
  Staging = "staging",
  Production = "production",
}

const wsUrlSchema = z
  .string()
  .refine(
    url => url.startsWith("ws://") || url.startsWith("wss://"),
    "WebSocket URL must start with 'ws://' or 'wss://'",
  );

export const AdminEnvSchema = z.object({
  VITE_APP_ENV: z.enum(["development", "staging", "production"]),
  VITE_APP_BASE_URL: z.string().url(),
  VITE_API_URL: z.string().url(),
  VITE_GRAPHQL_URL: z.string().url(),
  VITE_SUBSCRIPTION_URL: wsUrlSchema,
  VITE_FIREBASE_API_KEY: z.string().min(1, "Firebase API Key is missing"),
  VITE_FIREBASE_AUTH_DOMAIN: z
    .string()
    .min(1, "Firebase Auth Domain is missing"),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1, "Firebase Project ID is missing"),
});

type HardcodedConfig = Omit<
  z.infer<typeof AdminEnvSchema>,
  | "VITE_FIREBASE_API_KEY"
  | "VITE_FIREBASE_AUTH_DOMAIN"
  | "VITE_FIREBASE_PROJECT_ID"
>;

const config: Record<EnvMode, HardcodedConfig> = {
  [EnvMode.Development]: {
    VITE_APP_ENV: "development",
    VITE_APP_BASE_URL: "http://localhost:3000",
    VITE_API_URL: "http://localhost:4000/api",
    VITE_GRAPHQL_URL: "http://localhost:4000/graphql",
    VITE_SUBSCRIPTION_URL: "ws://localhost:4000/graphql",
  },
  [EnvMode.Staging]: {
    VITE_APP_ENV: "staging",
    VITE_APP_BASE_URL: "https://staging.eastgate.co",
    VITE_API_URL: "https://staging-api.eastgate.co/api",
    VITE_GRAPHQL_URL: "https://staging-api.eastgate.co/graphql",
    VITE_SUBSCRIPTION_URL: "wss://staging-api.eastgate.co/graphql",
  },
  [EnvMode.Production]: {
    VITE_APP_ENV: "production",
    VITE_APP_BASE_URL: "https://eastgate.co",
    VITE_API_URL: "https://api.eastgate.co/api",
    VITE_GRAPHQL_URL: "https://api.eastgate.co/graphql",
    VITE_SUBSCRIPTION_URL: "wss://api.eastgate.co/graphql",
  },
};

function getModeFromStr(str: string): EnvMode {
  if (str === "development") return EnvMode.Development;
  if (str === "staging") return EnvMode.Staging;
  if (str === "production") return EnvMode.Production;
  throw new Error(`❌ Invalid application compilation execution mode: ${str}`);
}

export function createAdminEnvFactory<TAdmin extends z.ZodRawShape>(
  adminSchema: TAdmin,
) {
  const isAdmin = typeof window !== "undefined";
  const mode = import.meta.env.MODE || "development";
  const envMode = getModeFromStr(mode);

  const runtimeTargetConfig = {
    ...config[envMode],
    VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  };

  const envCache = {} as z.infer<z.ZodObject<TAdmin>>;

  const validationResult = z.object(adminSchema).safeParse(runtimeTargetConfig);

  if (!validationResult.success) {
    console.error(
      `❌ Local Environment constraint evaluation failed for target configuration node [${envMode}]:`,
      validationResult.error.format(),
    );
    throw new Error(
      `Execution halted: Environment schema verification failed.`,
    );
  }

  Object.assign(envCache, validationResult.data);

  return {
    isServer: !isAdmin,
    mode: envMode,
    get<Key extends keyof z.infer<z.ZodObject<TAdmin>>>(
      key: Key,
    ): z.infer<z.ZodObject<TAdmin>>[Key] {
      if (!(key in envCache)) {
        throw new Error(
          `❌ Target key error: Property '${String(key)}' is missing in cached lookup context.`,
        );
      }
      return envCache[key];
    },
  };
}

export const adminEnv = createAdminEnvFactory(AdminEnvSchema.shape);

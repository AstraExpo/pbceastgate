import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Resolve execution paths correctly within the monorepo workspace structure
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the absolute path targeting the server application runtime environment variables
const envPath = path.resolve(__dirname, "../../apps/server/.env");

// Load the environment configuration file explicitly
const result = dotenv.config({ path: envPath });

// Technical Safeguard: Throw a clear error if the file path is completely invalid
if (result.error) {
  throw new Error(`Failed to load .env file from target path: ${envPath}. Confirm the file location is accurate.`);
}

// Technical Safeguard: Throw a clear error if the specific variable key is missing inside the file
if (!process.env.DATABASE_URL) {
  throw new Error(`DATABASE_URL is missing or undefined inside the environment file located at: ${envPath}`);
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
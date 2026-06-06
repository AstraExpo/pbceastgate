import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './client/index.js';

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Database initialization failed: 'DATABASE_URL' environment variable is undefined."
  );
}

// Setup the Node-Postgres connection pool using the environment variable
const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL 
});
const adapter = new PrismaPg(pool);

// Export the instantiated runtime client (lowercase 'prisma')
export const prisma = new PrismaClient({ adapter });

// Export all generated types (uppercase 'Prisma', User, Post, etc.)
export * from './client/index.js';
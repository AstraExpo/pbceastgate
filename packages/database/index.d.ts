import { PrismaClient } from './client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';

// Explicitly declare the type definition for your custom lowercase client instance
export const prisma: PrismaClient<{ adapter: PrismaPg }, never, any>;

// Wildcard re-export to expose all generated model types (User, Post, etc.)
export * from './client/index.js';
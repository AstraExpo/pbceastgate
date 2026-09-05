-- CreateEnum
CREATE TYPE "UserTheme" AS ENUM ('Light', 'Dark', 'System');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "theme" "UserTheme" NOT NULL DEFAULT 'System';

/*
  Warnings:

  - The values [Light,Dark,System] on the enum `UserTheme` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserTheme_new" AS ENUM ('light', 'dark', 'system');
ALTER TABLE "public"."user" ALTER COLUMN "theme" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "theme" TYPE "UserTheme_new" USING ("theme"::text::"UserTheme_new");
ALTER TYPE "UserTheme" RENAME TO "UserTheme_old";
ALTER TYPE "UserTheme_new" RENAME TO "UserTheme";
DROP TYPE "public"."UserTheme_old";
ALTER TABLE "user" ALTER COLUMN "theme" SET DEFAULT 'system';
COMMIT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "theme" SET DEFAULT 'system';

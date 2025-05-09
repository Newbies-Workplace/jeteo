/*
  - You are about to drop the column `google_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
*/
-- DropIndex
DROP INDEX "User_google_id_key";

-- AlterTable
ALTER TABLE "User"
    RENAME COLUMN "avatar" TO "image";
ALTER TABLE "User"
    ADD COLUMN     "email" TEXT,
    ADD COLUMN     "emailVerified" TIMESTAMP(3),
    ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

UPDATE "User" SET "email" = 'user' || id || '@jeteo.newbies.pl';

ALTER TABLE "User"
    ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- create accounts for all users based on their User google_id
INSERT INTO "Account" ("userId", "type", "provider", "providerAccountId", "createdAt", "updatedAt")
    SELECT "id", 'oidc', 'google', "google_id", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM "User" WHERE "google_id" IS NOT NULL;

ALTER TABLE "User"
    DROP COLUMN "google_id";

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "DateFormat" AS ENUM ('DD_MONTH_YYYY', 'MONTH_DD_YYYY', 'DD_MM_YYYY', 'MM_DD_YYYY');

-- CreateEnum
CREATE TYPE "FriendsOrder" AS ENUM ('ADDED', 'ALPHA');

-- CreateTable
CREATE TABLE "UserSettings" (
    "id"           TEXT          NOT NULL,
    "userId"       TEXT          NOT NULL,
    "dateFormat"   "DateFormat"  NOT NULL DEFAULT 'DD_MONTH_YYYY',
    "friendsOrder" "FriendsOrder" NOT NULL DEFAULT 'ADDED',
    "updatedAt"    TIMESTAMP(3)  NOT NULL,
    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- AddForeignKey
ALTER TABLE "UserSettings"
    ADD CONSTRAINT "UserSettings_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

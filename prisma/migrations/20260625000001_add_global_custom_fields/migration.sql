-- CreateTable
CREATE TABLE "GlobalCustomField" (
    "id"        TEXT          NOT NULL,
    "userId"    TEXT          NOT NULL,
    "label"     TEXT          NOT NULL,
    "fieldType" TEXT          NOT NULL DEFAULT 'TEXT',
    "createdAt" TIMESTAMP(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GlobalCustomField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GlobalCustomField_userId_idx" ON "GlobalCustomField"("userId");

-- AddForeignKey
ALTER TABLE "GlobalCustomField"
    ADD CONSTRAINT "GlobalCustomField_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

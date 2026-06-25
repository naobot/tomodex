-- CreateTable
CREATE TABLE "GlobalCustomFieldValue" (
    "id"        TEXT          NOT NULL,
    "ownerId"   TEXT          NOT NULL,
    "personId"  TEXT          NOT NULL,
    "fieldId"   TEXT          NOT NULL,
    "value"     TEXT          NOT NULL,
    "updatedAt" TIMESTAMP(3)  NOT NULL,
    CONSTRAINT "GlobalCustomFieldValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GlobalCustomFieldValue_personId_fieldId_key"
    ON "GlobalCustomFieldValue"("personId", "fieldId");

CREATE INDEX "GlobalCustomFieldValue_personId_idx"
    ON "GlobalCustomFieldValue"("personId");

-- AddForeignKey
ALTER TABLE "GlobalCustomFieldValue"
    ADD CONSTRAINT "GlobalCustomFieldValue_ownerId_fkey"
    FOREIGN KEY ("ownerId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "GlobalCustomFieldValue"
    ADD CONSTRAINT "GlobalCustomFieldValue_personId_fkey"
    FOREIGN KEY ("personId") REFERENCES "Person"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "GlobalCustomFieldValue"
    ADD CONSTRAINT "GlobalCustomFieldValue_fieldId_fkey"
    FOREIGN KEY ("fieldId") REFERENCES "GlobalCustomField"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

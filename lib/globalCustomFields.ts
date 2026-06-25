import { prisma } from "@/lib/prisma";
import { withDb, type DbResult } from "@/lib/db";

export type GlobalCustomFieldData = {
  id: string;
  label: string;
  fieldType: string;
  createdAt: string;
};

export async function getGlobalCustomFields(
  userId: string,
): Promise<DbResult<GlobalCustomFieldData[]>> {
  return withDb(async () => {
    const fields = await prisma.globalCustomField.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      select: { id: true, label: true, fieldType: true, createdAt: true },
    });
    return fields.map((f) => ({ ...f, createdAt: f.createdAt.toISOString() }));
  });
}

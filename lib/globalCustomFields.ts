import { prisma } from "@/lib/prisma";
import { withDb, type DbResult } from "@/lib/db";

export type GlobalCustomFieldData = {
  id: string;
  label: string;
  fieldType: string;
  createdAt: string;
};

export type GlobalFieldWithValue = {
  fieldId: string;
  label: string;
  valueId: string | null;
  value: string;
};

export async function getGlobalFieldsWithValues(
  userId: string,
  personId: string,
): Promise<DbResult<GlobalFieldWithValue[]>> {
  return withDb(async () => {
    const [fields, values] = await Promise.all([
      prisma.globalCustomField.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" },
        select: { id: true, label: true },
      }),
      prisma.globalCustomFieldValue.findMany({
        where: { personId, ownerId: userId },
        select: { id: true, fieldId: true, value: true },
      }),
    ]);

    const valueByFieldId = new Map(values.map((v) => [v.fieldId, v]));

    return fields.map((f) => {
      const v = valueByFieldId.get(f.id);
      return { fieldId: f.id, label: f.label, valueId: v?.id ?? null, value: v?.value ?? "" };
    });
  });
}

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

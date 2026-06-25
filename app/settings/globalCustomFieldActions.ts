"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createGlobalCustomField(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised");

  const label = (formData.get("label") as string)?.trim();
  if (!label) throw new Error("Label is required");

  await prisma.globalCustomField.create({
    data: { userId: session.user.id, label, fieldType: "TEXT" },
  });

  revalidatePath("/settings");
}

export async function deleteGlobalCustomField(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised");

  await prisma.globalCustomField.deleteMany({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/settings");
}

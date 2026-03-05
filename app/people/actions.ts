"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addPerson(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised");

  const displayName = (formData.get("displayName") as string)?.trim();
  if (!displayName) throw new Error("Display name is required");

  const fullName = (formData.get("fullName") as string)?.trim() || null;

  await prisma.person.create({
    data: {
      displayName,
      fullName,
      ownerId: session.user.id,
    },
  });

  revalidatePath("/people");
}
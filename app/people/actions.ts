"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function addPerson(formData: FormData): Promise<{ id: string }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised");

  const displayName = (formData.get("displayName") as string)?.trim();
  if (!displayName) throw new Error("Display name is required");

  const fullName = (formData.get("fullName") as string)?.trim() || null;

  const person = await prisma.person.create({
    data: {
      displayName,
      fullName,
      ownerId: session.user.id,
    },
    select: { id: true },
  });

  // No revalidatePath needed — the client will navigate away from this page
  // immediately, and the people list will revalidate naturally on next visit
  return { id: person.id };
}
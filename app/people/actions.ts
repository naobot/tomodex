"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addPerson(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised");

  const name = formData.get("name") as string;
  if (!name?.trim()) throw new Error("Name is required");

  await prisma.person.create({
    data: {
      displayName: name.trim(),
      ownerId: session.user.id,
    },
  });

  revalidatePath("/people");
}

export async function deletePerson(personId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised");

  // Verify ownership before deleting — never trust the client
  const person = await prisma.person.findUnique({
    where: { id: personId },
    select: { ownerId: true },
  });

  if (!person || person.ownerId !== session.user.id) {
    throw new Error("Not found or forbidden");
  }

  await prisma.person.delete({ where: { id: personId } });
  revalidatePath("/people");
}
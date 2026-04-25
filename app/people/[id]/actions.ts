"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function requireOwnership(personId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised");

  const person = await prisma.person.findUnique({
    where: { id: personId },
    select: { ownerId: true },
  });
  if (!person || person.ownerId !== session.user.id) {
    throw new Error("Not found or forbidden");
  }

  return session.user.id;
}

function revalidatePerson(personId: string) {
  revalidatePath(`/people/${personId}`);
}

// ---------------------------------------------------------------------------
// Person core fields
// ---------------------------------------------------------------------------

export async function updatePerson(personId: string, formData: FormData) {
  const ownerId = await requireOwnership(personId);

  const displayName = (formData.get("displayName") as string)?.trim();
  if (!displayName) throw new Error("Display name is required");

  const fullName = (formData.get("fullName") as string)?.trim() || null;

  const birthDay   = formData.get("birthDay")   ? Number(formData.get("birthDay"))   : null;
  const birthMonth = formData.get("birthMonth") ? Number(formData.get("birthMonth")) : null;
  const birthYear  = formData.get("birthYear")  ? Number(formData.get("birthYear"))  : null;

  const city    = (formData.get("city") as string)?.trim()    || null;
  const country = (formData.get("country") as string)?.trim() || null;

  await prisma.person.update({
    where: { id: personId },
    data: { displayName, fullName, birthDay, birthMonth, birthYear },
  });

  if (city || country) {
    await prisma.location.upsert({
      where:  { personId },
      create: { personId, ownerId, city, country },
      update: { city, country },
    });
  } else {
    await prisma.location.deleteMany({ where: { personId } });
  }

  revalidatePerson(personId);
}

// ---------------------------------------------------------------------------
// Phone numbers
// ---------------------------------------------------------------------------

export async function addPhoneNumber(personId: string, formData: FormData) {
  const ownerId = await requireOwnership(personId);

  const number = (formData.get("number") as string)?.trim();
  if (!number) throw new Error("Number is required");
  const label = (formData.get("label") as string)?.trim() || null;

  await prisma.phoneNumber.create({
    data: { personId, ownerId, number, label },
  });

  revalidatePerson(personId);
}

export async function deletePhoneNumber(personId: string, phoneId: string) {
  await requireOwnership(personId);
  await prisma.phoneNumber.delete({ where: { id: phoneId } });
  revalidatePerson(personId);
}

// ---------------------------------------------------------------------------
// Email addresses
// ---------------------------------------------------------------------------

export async function addEmailAddress(personId: string, formData: FormData) {
  const ownerId = await requireOwnership(personId);

  const address = (formData.get("address") as string)?.trim();
  if (!address) throw new Error("Address is required");
  const label = (formData.get("label") as string)?.trim() || null;

  await prisma.emailAddress.create({
    data: { personId, ownerId, address, label },
  });

  revalidatePerson(personId);
}

export async function deleteEmailAddress(personId: string, emailId: string) {
  await requireOwnership(personId);
  await prisma.emailAddress.delete({ where: { id: emailId } });
  revalidatePerson(personId);
}

// ---------------------------------------------------------------------------
// Mailing addresses
// ---------------------------------------------------------------------------

export async function addMailingAddress(personId: string, formData: FormData) {
  const ownerId = await requireOwnership(personId);

  const mailingAddress = (formData.get("mailingAddress") as string)?.trim();
  if (!mailingAddress) throw new Error("Mailing address is required");
  const label = (formData.get("label") as string)?.trim() || null;

  await prisma.mailingAddress.create({
    data: { personId, ownerId, mailingAddress, label },
  });

  revalidatePerson(personId);
}

export async function deleteMailingAddress(
  personId: string,
  mailingAddressId: string
) {
  await requireOwnership(personId);
  await prisma.mailingAddress.delete({ where: { id: mailingAddressId } });
  revalidatePerson(personId);
}

// ---------------------------------------------------------------------------
// Notes
// ---------------------------------------------------------------------------

export async function addNote(personId: string, formData: FormData) {
  const ownerId = await requireOwnership(personId);

  const body = (formData.get("body") as string)?.trim();
  if (!body) throw new Error("Note body is required");

  await prisma.note.create({
    data: { personId, ownerId, body },
  });

  revalidatePerson(personId);
}

export async function updateNote(
  personId: string,
  noteId: string,
  formData: FormData
) {
  await requireOwnership(personId);

  const body = (formData.get("body") as string)?.trim();
  if (!body) throw new Error("Note body is required");

  await prisma.note.update({ where: { id: noteId }, data: { body } });
  revalidatePerson(personId);
}

export async function deleteNote(personId: string, noteId: string) {
  await requireOwnership(personId);
  await prisma.note.delete({ where: { id: noteId } });
  revalidatePerson(personId);
}

// ---------------------------------------------------------------------------
// Custom attributes
// ---------------------------------------------------------------------------

export async function addCustomAttribute(
  personId: string,
  formData: FormData
) {
  const ownerId = await requireOwnership(personId);

  const key = (formData.get("key") as string)?.trim();
  const value = (formData.get("value") as string)?.trim();
  if (!key || !value) throw new Error("Key and value are required");

  await prisma.customAttribute.create({
    data: { personId, ownerId, key, value },
  });

  revalidatePerson(personId);
}

export async function deleteCustomAttribute(
  personId: string,
  attributeId: string
) {
  await requireOwnership(personId);
  await prisma.customAttribute.delete({ where: { id: attributeId } });
  revalidatePerson(personId);
}
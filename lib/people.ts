import { prisma } from "@/lib/prisma";
import { withDb, type DbResult } from "@/lib/db";
import type { SerialisedPerson } from "@/app/people/[id]/types";

// ---------------------------------------------------------------------------
// PersonSummary — used by AppShell sidebar
// ---------------------------------------------------------------------------

export type PersonSummary = {
  id: string;
  displayName: string;
  updatedAt: string;
};

export async function getPeopleForUser(userId: string): Promise<DbResult<PersonSummary[]>> {
  return withDb(async () => {
    const people = await prisma.person.findMany({
      where: { ownerId: userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        displayName: true,
        updatedAt: true,
      },
    });

    return people.map((p) => ({
      ...p,
      updatedAt: p.updatedAt.toISOString(),
    }));
  });
}

// ---------------------------------------------------------------------------
// PersonGridItem — used by /people page
// ---------------------------------------------------------------------------

export type PersonGridItem = {
  id: string;
  displayName: string;
  location: {
    city: string | null;
    country: string | null;
  } | null;
};

export async function getPeopleGridForUser(userId: string): Promise<DbResult<PersonGridItem[]>> {
  return withDb(() =>
    prisma.person.findMany({
      where: { ownerId: userId },
      orderBy: { displayName: "asc" },
      select: {
        id: true,
        displayName: true,
        location: {
          select: { city: true, country: true },
        },
      },
    })
  );
}

// ---------------------------------------------------------------------------
// FriendsCloudPerson — used by FriendsCloud on home page
// ---------------------------------------------------------------------------

export type FriendsCloudPerson = {
  id: string;
  displayName: string;
};

export async function getFriendsCloudForUser(userId: string): Promise<DbResult<FriendsCloudPerson[]>> {
  return withDb(async () => {
    const people = await prisma.person.findMany({
      where: { ownerId: userId },
      select: { id: true, displayName: true },
    });

    // Fisher-Yates shuffle, then take first 20
    for (let i = people.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [people[i], people[j]] = [people[j], people[i]];
    }

    return people.slice(0, 20);
  });
}

// ---------------------------------------------------------------------------
// SerialisedPerson — used by /people/[id] page
// ---------------------------------------------------------------------------

export async function getPersonForUser(
  personId: string,
  userId: string
): Promise<DbResult<SerialisedPerson>> {
  return withDb(async () => {
    const person = await prisma.person.findUnique({
      where: { id: personId },
      include: {
        phoneNumbers: true,
        emailAddresses: true,
        mailingAddresses: true,
        location: true,
        notes: { orderBy: { updatedAt: "desc" } },
        customAttributes: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!person || person.ownerId !== userId) {
      throw new Error("NOT_FOUND");
    }

    return {
      ...person,
      createdAt: person.createdAt.toISOString(),
      updatedAt: person.updatedAt.toISOString(),
      notes: person.notes.map((n) => ({
        ...n,
        createdAt: n.createdAt.toISOString(),
        updatedAt: n.updatedAt.toISOString(),
      })),
      customAttributes: person.customAttributes.map((a) => ({
        ...a,
        createdAt: a.createdAt.toISOString(),
      })),
    };
  });
}
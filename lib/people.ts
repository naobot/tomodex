import { prisma } from "@/lib/prisma";

export type PersonSummary = {
  id: string;
  displayName: string;
  updatedAt: string;
};

export async function getPeopleForUser(userId: string): Promise<PersonSummary[]> {
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
}

export type PersonGridItem = {
  id: string;
  displayName: string;
  location: {
    city: string | null;
    country: string | null;
  } | null;
};

export async function getPeopleGridForUser(userId: string): Promise<PersonGridItem[]> {
  const people = await prisma.person.findMany({
    where: { ownerId: userId },
    orderBy: { displayName: "asc" },
    select: {
      id: true,
      displayName: true,
      location: {
        select: { city: true, country: true },
      },
    },
  });

  return people;
}
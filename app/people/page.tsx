import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PersonList from "./PersonList";

export default async function PeoplePage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const people = await prisma.person.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      displayName: true,
      updatedAt: true,
    },
  });

  const serialisedPeople = people.map((p) => ({
    ...p,
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Friends</h1>
      <PersonList people={serialisedPeople} />
    </main>
  );
}
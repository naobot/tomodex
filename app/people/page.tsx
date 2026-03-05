import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PersonList from "./PersonList";

export default async function PeoplePage() {
  const session = await auth();

  // proxy.ts should have caught this, but defence in depth:
  // a Server Component should never assume the middleware ran cleanly
  if (!session?.user?.id) {
    redirect("/login");
  }

  const people = await prisma.person.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      displayName: true,
      createdAt: true,
    },
  });

  // Serialise Dates before passing across the server/client boundary.
  // Next.js will warn (and may error) if you pass raw Date objects as props
  // to Client Components — they must be plain JSON-serialisable values.
  const serialisedPeople = people.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">People</h1>
      <PersonList people={serialisedPeople} />
    </main>
  );
}
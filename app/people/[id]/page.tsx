import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PersonDetail from "./PersonDetail";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PersonPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;

  const person = await prisma.person.findUnique({
    where: { id },
    include: {
      phoneNumbers: true,
      emailAddresses: true,
      mailingAddresses: true,
      location: true,
      notes: { orderBy: { updatedAt: "desc" } },
      customAttributes: { orderBy: { createdAt: "asc" } },
    },
  });

  // notFound() renders Next.js's built-in 404 page
  if (!person) notFound();

  // Ownership check — a valid record that belongs to someone else is still a 404
  // from this user's perspective; never leak that the record exists
  if (person.ownerId !== session.user.id) notFound();

  // Serialise all Date objects before crossing the server/client boundary
  const serialised = {
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

  return (
    <AppShell>
      <PersonDetail person={serialised} />
    </AppShell>);
}
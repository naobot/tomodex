import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import PersonList from "@/app/PersonList";

type Props = {
  children: React.ReactNode;
};

export default async function AppShell({ children }: Props) {
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
    <div className="flex min-h-screen w-full">
      <Sidebar isLoggedIn={Boolean(session?.user?.id)}>
        <PersonList people={serialisedPeople} />
      </Sidebar>
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 p-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
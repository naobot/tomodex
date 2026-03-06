import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import PersonGrid from "./PersonGrid";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getPeopleGridForUser } from "@/lib/people";

export default async function PeoplePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const people = await getPeopleGridForUser(session.user?.id)

  return (
    <AppShell>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-pixel uppercase"
        >
          ←
        </Link>
        <h1 className="mb-6 text-md text-pixel uppercase">Friends</h1>
      </div>
      <div>
        <div>
          {/* TODO Advanced search bar with filter and sort options */}
          {/* TODO List of People with Cards displaying summaries of their profiles, click through to access Person Details page */}
          <div className="flex flex-col w-full">
            <PersonGrid people={people} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
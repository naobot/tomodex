import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import PersonGrid from "./PersonGrid";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getPeopleGridForUser } from "@/lib/people";
import DbErrorToast from "@/components/toast/DbErrorToast";

export default async function PeoplePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const result = await getPeopleGridForUser(session.user?.id);

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
          <div className="flex flex-col w-full">
            {result.ok
              ? <PersonGrid people={result.data} />
              : <DbErrorToast error={result.error} />
            }
          </div>
        </div>
      </div>
    </AppShell>
  );
}
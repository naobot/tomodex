import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPersonForUser } from "@/lib/people";
import PersonDetail from "./PersonDetail";
import AppShell from "@/components/layout/AppShell";
import DbErrorToast from "@/components/toast/DbErrorToast";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PersonPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;

  const result = await getPersonForUser(id, session.user.id);

  if (!result.ok) {
    if (result.error === "NOT_FOUND") notFound();

    return (
      <AppShell>
        <DbErrorToast error={result.error} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PersonDetail person={result.data} />
    </AppShell>
  );
}
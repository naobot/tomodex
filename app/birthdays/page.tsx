import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import BirthdayList from "./BirthdayList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getBirthdaysForUser } from "@/lib/birthdays";
import DbErrorToast from "@/components/toast/DbErrorToast";

export default async function BirthdaysPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const result = await getBirthdaysForUser(session.user.id);

  return (
    <AppShell>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 13,
            color: "var(--color-text-faint)",
            cursor: "pointer",
          }}>‹</span>
        </Link>
        <span style={{
          fontFamily: "var(--font-pixel)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--color-text)",
        }}>Birthdays</span>
      </div>

      {result.ok
        ? <BirthdayList data={result.data} />
        : <DbErrorToast error={result.error} />
      }
    </AppShell>
  );
}

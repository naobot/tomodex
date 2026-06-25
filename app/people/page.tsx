import AppShell from "@/components/layout/AppShell";
import PersonGrid from "./PersonGrid";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getPeopleGridForUser } from "@/lib/people";
import { getUserSettings, DEFAULT_SETTINGS } from "@/lib/settings";
import DbErrorToast from "@/components/toast/DbErrorToast";
import Link from "next/link";

export default async function PeoplePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [result, settingsResult] = await Promise.all([
    getPeopleGridForUser(session.user.id),
    getUserSettings(session.user.id),
  ]);

  const dateFormat = settingsResult.ok ? settingsResult.data.dateFormat : DEFAULT_SETTINGS.dateFormat;

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
        }}>All Friends</span>
      </div>

      {result.ok
        ? <PersonGrid people={result.data} dateFormat={dateFormat} />
        : <DbErrorToast error={result.error} />
      }
    </AppShell>
  );
}

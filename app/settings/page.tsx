import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { getUserSettings, DEFAULT_SETTINGS } from "@/lib/settings";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const settingsResult = await getUserSettings(session.user.id);
  const settings = settingsResult.ok ? settingsResult.data : DEFAULT_SETTINGS;

  return (
    <AppShell>
      <SettingsClient settings={settings} />
    </AppShell>
  );
}

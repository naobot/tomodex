import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { getUserSettings, DEFAULT_SETTINGS } from "@/lib/settings";
import { getGlobalCustomFields } from "@/lib/globalCustomFields";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [settingsResult, fieldsResult] = await Promise.all([
    getUserSettings(session.user.id),
    getGlobalCustomFields(session.user.id),
  ]);

  const settings = settingsResult.ok ? settingsResult.data : DEFAULT_SETTINGS;
  const globalFields = fieldsResult.ok ? fieldsResult.data : [];

  return (
    <AppShell>
      <SettingsClient settings={settings} globalFields={globalFields} />
    </AppShell>
  );
}

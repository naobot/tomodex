import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPeopleForUser } from "@/lib/people";
import { getUserSettings, DEFAULT_SETTINGS } from "@/lib/settings";
import { SidebarProvider } from "@/lib/SidebarContext";
import Sidebar from "./Sidebar";
import MobileTopNav from "./MobileTopNav";
import Footer from "./Footer";
import PersonList from "@/app/people/PersonList";
import NavigationOverlay from "@/components/ui/NavigationOverlay";
import DbErrorToast from "@/components/toast/DbErrorToast";

type Props = {
  children: React.ReactNode;
};

export default async function AppShell({ children }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const settingsResult = await getUserSettings(session.user.id);
  const friendsOrder = settingsResult.ok ? settingsResult.data.friendsOrder : DEFAULT_SETTINGS.friendsOrder;
  const result = await getPeopleForUser(session.user.id, friendsOrder);

  const friendList = result.ok
    ? <PersonList people={result.data} />
    : <DbErrorToast error={result.error} />;

  const isLoggedIn = Boolean(session?.user?.id);

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row min-h-screen w-full">
        {/* Mobile top nav — hidden on md+ */}
        <div className="md:hidden">
          <MobileTopNav isLoggedIn={isLoggedIn}>{friendList}</MobileTopNav>
        </div>

        {/* Desktop sidebar — hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar isLoggedIn={isLoggedIn}>{friendList}</Sidebar>
        </div>

        <div className="flex flex-col flex-1 min-w-0 relative">
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
          <NavigationOverlay />
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
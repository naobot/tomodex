import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPeopleForUser } from "@/lib/people";
import { SidebarProvider } from "@/lib/SidebarContext";
import Sidebar from "./Sidebar";
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

  const result = await getPeopleForUser(session.user.id);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar isLoggedIn={Boolean(session?.user?.id)}>
          {result.ok
            ? <PersonList people={result.data} />
            : <DbErrorToast error={result.error} />
          }
        </Sidebar>
        <div className="flex flex-col flex-1 min-w-0 relative">
          <main className="flex-1 p-6">
            {children}
          </main>
          <NavigationOverlay />
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPeopleForUser } from "@/lib/people";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import PersonList from "@/app/people/PersonList";

type Props = {
  children: React.ReactNode;
};

export default async function AppShell({ children }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const people = await getPeopleForUser(session.user.id);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar isLoggedIn={Boolean(session?.user?.id)}>
        <PersonList people={people} />
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
import Sidebar from "./Sidebar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 p-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
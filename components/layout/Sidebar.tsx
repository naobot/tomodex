import Header from "@/components/ui/Header";

type Props = {
  isLoggedIn: boolean;
  children?: React.ReactNode;
};

export default function Sidebar({ isLoggedIn, children }: Props) {
  return (
    <aside
      className="sticky top-0 h-screen flex flex-col w-64 shrink-0"
      style={{ borderRight: "1px solid rgba(0, 0, 0, 0.06)" }}
    >
      <div className="p-4">
        <Header isLoggedIn={isLoggedIn} />
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {children}
      </div>

    </aside>
  );
}
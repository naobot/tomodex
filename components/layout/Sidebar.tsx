type Props = {
  children?: React.ReactNode;
};

export default function Sidebar({ children }: Props) {
  return (
    <aside className="sticky top-0 h-screen flex flex-col w-64 shrink-0">
      <div className="p-4">
        {/* Search bar */}
        <input type="text" placeholder="Search friends..." />
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {/* Friends list */}
        {children}
      </div>

      <div className="p-4">
        {/* Birthdays link */}
        <a href="/birthdays">Birthdays</a>
      </div>
    </aside>
  );
}
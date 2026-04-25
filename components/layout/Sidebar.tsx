"use client";

import { useSidebar } from "@/lib/SidebarContext";
import { AuthButton } from "@/components/auth/AuthButton";

type Props = {
  isLoggedIn: boolean;
  children?: React.ReactNode;
};

export default function Sidebar({ isLoggedIn, children }: Props) {
  const { query, setQuery, openAddModal } = useSidebar();

  return (
    <aside
      className="sticky top-0 h-screen flex flex-col w-64 shrink-0"
      style={{ borderRight: "1px solid rgba(0, 0, 0, 0.06)" }}
    >
      {/* Logotype + Sign Out */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 16px 14px" }}>
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text)" }}>
          Tomodex
        </span>
        <AuthButton isLoggedIn={isLoggedIn} />
      </div>

      {/* Search + Add */}
      <div style={{ display: "flex", gap: 6, padding: "0 16px 12px", alignItems: "stretch" }}>
        <input
          className="input"
          style={{ fontSize: "var(--text-xs)", padding: "5px 10px", flex: 1, minWidth: 0 }}
          placeholder="Find…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn"
          style={{ padding: "3px 6px", fontSize: 12, flexShrink: 0, lineHeight: 1, minWidth: 24 }}
          onClick={openAddModal}
        >
          +
        </button>
      </div>

      {/* Friend list */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "0 16px" }}>
        {children}
      </div>
    </aside>
  );
}
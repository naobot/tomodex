"use client";

import Link from "next/link";
import { useSidebar } from "@/lib/SidebarContext";
import { AuthButton } from "@/components/auth/AuthButton";

type Props = {
  isLoggedIn: boolean;
  children?: React.ReactNode;
};

export default function Sidebar({ isLoggedIn, children }: Props) {
  const { query, setQuery, openAddModal } = useSidebar();

  const BOTTOM_NAV_ITEMS = [
    {
      url: "/people",
      text: "All Friends"
    },
    {
      url: "/birthdays",
      text: "Birthdays"
    },
  ]

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

      {/* Bottom nav */}
      <div style={{ padding: "12px 16px 20px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {BOTTOM_NAV_ITEMS.map((item, i) => (
          <Link key={`bottomnav-${i}`} href={item.url} style={{ textDecoration: "none" }}>
            <div style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "var(--text-xs)",
              fontWeight: 300,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-text-faint)",
            }}>
              {item.text}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
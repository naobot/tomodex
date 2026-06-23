"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/lib/SidebarContext";
import { AuthButton } from "@/components/auth/AuthButton";

type Props = {
  isLoggedIn: boolean;
  children?: React.ReactNode;
};

const NAV_ITEMS = [
  { url: "/people", text: "All Friends" },
  { url: "/birthdays", text: "Birthdays" },
];

export default function MobileTopNav({ isLoggedIn, children }: Props) {
  const { query, setQuery, openAddModal } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setNavHeight(el.offsetHeight));
    observer.observe(el);
    setNavHeight(el.offsetHeight);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={navRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "var(--color-bg)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Logo + Auth */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px 7px" }}>
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text)" }}>
            Tomodex
          </span>
          <AuthButton isLoggedIn={isLoggedIn} />
        </div>

        {/* Search + Add */}
        <div style={{ display: "flex", gap: 6, padding: "0 14px 8px", alignItems: "stretch" }}>
          <input
            className="input"
            style={{ fontSize: "var(--text-xs)", padding: "5px 10px", flex: 1, minWidth: 0 }}
            placeholder="Find…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <button
            className="btn"
            style={{ padding: "3px 6px", fontSize: 12, flexShrink: 0, lineHeight: 1, minWidth: 24 }}
            onClick={openAddModal}
          >
            +
          </button>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 14px 10px" }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.url} href={item.url} style={{ textDecoration: "none" }}>
              <span style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "var(--text-xs)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text-faint)",
              }}>
                {item.text}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Friends list overlay */}
      {isOpen && navHeight > 0 && (
        <div
          style={{
            position: "fixed",
            top: navHeight,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 15,
            background: "var(--color-bg)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, padding: "8px 14px 0" }}>
            {children}
          </div>

          {/* Close arrow */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            position: "sticky",
            bottom: 0,
            background: "var(--color-bg)",
          }}>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-text-faint)",
                fontFamily: "var(--font-pixel)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "4px 8px",
              }}
            >
              ↑ close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

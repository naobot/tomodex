"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNavigationLoader } from "@/lib/NavigationContext";
import type { BirthdaysData } from "@/lib/birthdays";

const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

type Filter = "thisMonth" | "next30" | "all";

function formatDaysUntil(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${days} days`;
}

const PILLS: { key: Filter; label: string }[] = [
  { key: "thisMonth", label: "This Month" },
  { key: "next30",   label: "Next 30 Days" },
  { key: "all",      label: "All" },
];

type Props = { data: BirthdaysData };

export default function BirthdayList({ data }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const { startNavigating } = useNavigationLoader();
  const router = useRouter();

  const currentMonth = new Date().getMonth() + 1;

  const filtered = data.withBirthday.filter((p) => {
    if (filter === "thisMonth") return p.birthMonth === currentMonth;
    if (filter === "next30")    return p.daysUntil <= 30;
    return true;
  });

  function navTo(id: string) {
    startNavigating();
    router.push(`/people/${id}`);
  }

  return (
    <div>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {PILLS.map((pill) => {
          const active = filter === pill.key;
          return (
            <button
              key={pill.key}
              onClick={() => setFilter(pill.key)}
              style={{
                padding: "5px 14px",
                borderRadius: 100,
                border: `1px solid ${active ? "var(--color-border-strong)" : "var(--color-border)"}`,
                background: active ? "var(--color-surface)" : "var(--color-surface-raised)",
                boxShadow: active ? "none" : "var(--shadow-sm)",
                fontFamily: "var(--font-pixel)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: active ? "var(--color-text)" : "var(--color-text-faint)",
                cursor: "pointer",
                transition: "all 120ms ease-out",
              }}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* Birthday rows */}
      {filtered.length === 0 ? (
        <p style={{
          fontFamily: "var(--font-pixel)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--color-text-faint)",
          marginTop: 6,
        }}>
          No birthdays
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filtered.map((person) => (
            <li key={person.id}>
              <button
                onClick={() => navTo(person.id)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "6px 0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <div style={{
                  width: 44, height: 44,
                  background: "var(--color-surface-raised)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "var(--radius-sm)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: "var(--font-pixel)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-faint)", lineHeight: 1 }}>
                    {MONTH_ABBR[person.birthMonth - 1]}
                  </span>
                  <span style={{ fontSize: "var(--text-md)", fontWeight: 300, color: "var(--color-text-strong)", lineHeight: 1.3 }}>
                    {person.birthDay}
                  </span>
                </div>

                <span style={{ fontSize: "var(--text-md)", fontWeight: 300, color: "var(--color-text-strong)", flex: 1 }}>
                  {person.displayName}
                </span>

                <span style={{ fontFamily: "var(--font-pixel)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-faint)" }}>
                  {formatDaysUntil(person.daysUntil)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* "No birthday set" section — only in All filter */}
      {filter === "all" && data.withoutBirthday.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ borderTop: "1px solid var(--color-border)", marginBottom: 16 }} />
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-text)", marginBottom: 12 }}>
            No birthday set
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {data.withoutBirthday.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => navTo(p.id)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "2px 0",
                    cursor: "pointer",
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "var(--font-pixel)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-faint)",
                  }}
                >
                  {p.displayName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

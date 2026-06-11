"use client";
import { useState } from "react";
import type { BirthdaysData } from "@/lib/birthdays";
import BirthdayListRow from "./BirthdayListRow";

type Filter = "thisMonth" | "next30" | "all";

const PILLS: { key: Filter; label: string }[] = [
  { key: "thisMonth", label: "This Month" },
  { key: "next30",   label: "Next 30 Days" },
  { key: "all",      label: "All" },
];

type Props = { data: BirthdaysData };

export default function BirthdayList({ data }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const currentMonth = new Date().getMonth() + 1;

  const filtered = data.withBirthday.filter((p) => {
    if (filter === "thisMonth") return p.birthMonth === currentMonth;
    if (filter === "next30")    return p.daysUntil <= 30;
    return true;
  });

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
              <BirthdayListRow
                id={person.id}
                displayName={person.displayName}
                birthDay={person.birthDay}
                birthMonth={person.birthMonth}
                daysUntil={person.daysUntil}
              />
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
                <BirthdayListRow
                  id={p.id}
                  displayName={p.displayName}
                  faded
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

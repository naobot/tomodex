"use client";

import { useState, useTransition } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import type { UserSettingsData, DateFormat, FriendsOrder } from "@/lib/settings";
import { saveDisplaySettings } from "./actions";

const DATE_FORMAT_OPTIONS: { value: DateFormat; label: string; example: string }[] = [
  { value: "DD_MONTH_YYYY", label: "DD Mon YYYY",  example: "25 Jun 2026" },
  { value: "MONTH_DD_YYYY", label: "Mon DD, YYYY", example: "Jun 25, 2026" },
  { value: "DD_MM_YYYY",    label: "DD/MM/YYYY",   example: "25/06/2026"  },
  { value: "MM_DD_YYYY",    label: "MM/DD/YYYY",   example: "06/25/2026"  },
];

const FRIENDS_ORDER_OPTIONS: { value: FriendsOrder; label: string }[] = [
  { value: "ADDED", label: "By date added" },
  { value: "ALPHA", label: "Alphabetical"  },
];

// ---------------------------------------------------------------------------

function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderTop: "1px solid var(--color-border)" }}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-pixel)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--color-text)",
        }}
      >
        {title}
        <span style={{ fontSize: 10, color: "var(--color-text-faint)" }}>
          {isOpen ? "▲" : "▼"}
        </span>
      </button>
      {isOpen && (
        <div style={{ paddingBottom: 20 }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

function DisplaySettingsForm({ settings }: { settings: UserSettingsData }) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await saveDisplaySettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <form action={handleSubmit}>

      {/* Date format */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontFamily: "var(--font-pixel)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-text-faint)",
          marginBottom: 10,
        }}>
          Date format
        </div>
        {DATE_FORMAT_OPTIONS.map(({ value, label, example }) => (
          <label
            key={value}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, cursor: "pointer" }}
          >
            <input
              type="radio"
              name="dateFormat"
              value={value}
              defaultChecked={settings.dateFormat === value}
              style={{ accentColor: "var(--color-accent)", flexShrink: 0 }}
            />
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}>
              {example}
            </span>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>
              {label}
            </span>
          </label>
        ))}
      </div>

      {/* Friend order */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: "var(--font-pixel)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-text-faint)",
          marginBottom: 10,
        }}>
          Default friend order
        </div>
        {FRIENDS_ORDER_OPTIONS.map(({ value, label }) => (
          <label
            key={value}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, cursor: "pointer" }}
          >
            <input
              type="radio"
              name="friendsOrder"
              value={value}
              defaultChecked={settings.friendsOrder === value}
              style={{ accentColor: "var(--color-accent)", flexShrink: 0 }}
            />
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}>
              {label}
            </span>
          </label>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button type="submit" className="btn-submit" disabled={isPending}>
          {isPending ? "Saving…" : "Save"}
        </button>
        {saved && (
          <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>
            Saved.
          </span>
        )}
      </div>

    </form>
  );
}

// ---------------------------------------------------------------------------

type Props = { settings: UserSettingsData };

export default function SettingsClient({ settings }: Props) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
        <Link href="/" style={{ fontFamily: "var(--font-pixel)", fontSize: 13, color: "var(--color-text-faint)", lineHeight: 1, textDecoration: "none", userSelect: "none" }}>
          ‹
        </Link>
        <span style={{
          fontFamily: "var(--font-pixel)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--color-text)",
        }}>
          Settings
        </span>
      </div>

      <div style={{ borderBottom: "1px solid var(--color-border)" }}>

        <SettingsSection title="Display">
          <DisplaySettingsForm settings={settings} />
        </SettingsSection>

        <SettingsSection title="Email Notifications">
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>
            Coming soon.
          </p>
        </SettingsSection>

        <SettingsSection title="Global Custom Info">
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>
            Coming soon.
          </p>
        </SettingsSection>

      </div>
    </div>
  );
}

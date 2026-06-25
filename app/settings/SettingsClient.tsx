"use client";

import { useState } from "react";
import type { ReactNode } from "react";

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

export default function SettingsClient() {
  return (
    <div style={{ maxWidth: 540 }}>
      <div style={{ marginBottom: 24 }}>
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
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>
            Coming soon.
          </p>
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

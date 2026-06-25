"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import Link from "next/link";
import type { UserSettingsData, DateFormat, FriendsOrder } from "@/lib/settings";
import type { GlobalCustomFieldData } from "@/lib/globalCustomFields";
import { saveDisplaySettings } from "./actions";
import { createGlobalCustomField, deleteGlobalCustomField } from "./globalCustomFieldActions";

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

function GlobalCustomInfoSection({ fields }: { fields: GlobalCustomFieldData[] }) {
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setMounted(true), []);

  function openModal() { dialogRef.current?.showModal(); }
  function closeModal() { dialogRef.current?.close(); formRef.current?.reset(); }

  function handleCreate(formData: FormData) {
    startTransition(async () => {
      await createGlobalCustomField(formData);
      closeModal();
    });
  }

  function handleDelete(id: string) {
    startTransition(() => deleteGlobalCustomField(id));
  }

  return (
    <>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)", marginBottom: 20 }}>
        Global Custom Info fields appear on every friend&rsquo;s profile. Use them for things you want to track across all contacts — like &ldquo;How we met&rdquo; or &ldquo;Favourite food&rdquo;.
      </p>

      {fields.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
          {fields.map((field) => (
            <li
              key={field.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}>
                {field.label}
              </span>
              <button
                className="btn-destruct"
                onClick={() => handleDelete(field.id)}
                disabled={isPending}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button className="btn" onClick={openModal} disabled={isPending}>
        + New field
      </button>

      {mounted && createPortal(
        <dialog
          ref={dialogRef}
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: 0,
            boxShadow: "var(--shadow-lg)",
            width: "calc(100% - 2rem)",
            maxWidth: 420,
            margin: "auto",
          }}
          onClose={closeModal}
        >
          <div style={{ padding: "24px 28px" }}>
            <div style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--color-text)",
              marginBottom: 20,
            }}>
              New Global Field
            </div>
            <form ref={formRef} action={handleCreate} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-text-faint)",
                  marginBottom: 5,
                }}>
                  Field name <span style={{ color: "var(--color-accent)" }}>*</span>
                </div>
                <input
                  name="label"
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. How we met"
                  className="input"
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-text-faint)",
                  marginBottom: 5,
                }}>
                  Field type
                </div>
                <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>
                  Text
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, paddingTop: 4 }}>
                <button type="button" className="btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={isPending}>
                  {isPending ? "Creating…" : "Create field"}
                </button>
              </div>
            </form>
          </div>
        </dialog>,
        document.body
      )}
    </>
  );
}

// ---------------------------------------------------------------------------

type Props = {
  settings: UserSettingsData;
  globalFields: GlobalCustomFieldData[];
};

export default function SettingsClient({ settings, globalFields }: Props) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
        <Link href="/people" style={{ fontFamily: "var(--font-pixel)", fontSize: 13, color: "var(--color-text-faint)", lineHeight: 1, textDecoration: "none", userSelect: "none" }}>
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
          <GlobalCustomInfoSection fields={globalFields} />
        </SettingsSection>

      </div>
    </div>
  );
}

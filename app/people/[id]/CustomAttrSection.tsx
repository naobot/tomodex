"use client";
import { useState, useTransition } from "react";
import { addCustomAttribute, deleteCustomAttribute, setGlobalFieldValue } from "./actions";
import type { SerialisedCustomAttribute } from "./types";
import type { GlobalFieldWithValue } from "@/lib/globalCustomFields";
import Section from "@/components/layout/Section";

type Props = {
  personId: string;
  customAttributes: SerialisedCustomAttribute[];
  globalFields: GlobalFieldWithValue[];
};

export default function CustomAttrSection({ personId, customAttributes, globalFields }: Props) {
  const [isPending, startTransition] = useTransition();
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

  return (
    <Section title="Custom Info">

      {/* Global fields — view mode until Edit is clicked */}
      {globalFields.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
          {globalFields.map((field) =>
            editingFieldId === field.fieldId ? (
              <li key={field.fieldId} style={{ paddingBottom: 8 }}>
                <div style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-text-faint)",
                  marginBottom: 3,
                }}>
                  {field.label}
                </div>
                <form
                  style={{ display: "flex", gap: 8 }}
                  action={(fd) =>
                    startTransition(async () => {
                      await setGlobalFieldValue(personId, field.fieldId, fd.get("value") as string);
                      setEditingFieldId(null);
                    })
                  }
                >
                  <input
                    name="value"
                    defaultValue={field.value}
                    placeholder="—"
                    autoFocus
                    className="input"
                    style={{ flex: 1, minWidth: 0 }}
                  />
                  <button type="submit" className="btn-submit" disabled={isPending} style={{ flexShrink: 0 }}>
                    Save
                  </button>
                  <button type="button" className="btn" disabled={isPending} style={{ flexShrink: 0 }} onClick={() => setEditingFieldId(null)}>
                    Cancel
                  </button>
                </form>
              </li>
            ) : (
              <li
                key={field.fieldId}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0" }}
              >
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}>
                  <span style={{ color: "var(--color-text-strong)" }}>{field.label}:</span>{" "}
                  {field.value || <span style={{ color: "var(--color-text-faint)" }}>—</span>}
                </span>
                <button className="btn-inline" onClick={() => setEditingFieldId(field.fieldId)} disabled={isPending}>
                  Edit
                </button>
              </li>
            )
          )}
        </ul>
      )}

      {/* Divider between global and person-specific, only when both exist */}
      {globalFields.length > 0 && customAttributes.length > 0 && (
        <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "4px 0 12px" }} />
      )}

      {/* Person-specific custom attributes */}
      {customAttributes.length === 0 && globalFields.length === 0 && (
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>
          No custom attributes yet.
        </p>
      )}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px" }}>
        {customAttributes.map((attr) => (
          <li
            key={attr.id}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0" }}
          >
            <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}>
              <span style={{ color: "var(--color-text-strong)" }}>{attr.key}:</span>{" "}
              {attr.value}
            </span>
            <button
              className="btn-destruct"
              onClick={() => startTransition(() => deleteCustomAttribute(personId, attr.id))}
              disabled={isPending}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <form
        action={(fd) => startTransition(() => addCustomAttribute(personId, fd))}
        style={{ display: "flex", gap: 8 }}
      >
        <input
          name="key"
          placeholder="Label (e.g. Favourite tea)"
          required
          className="input"
          style={{ flex: 2, minWidth: 0 }}
        />
        <input
          name="value"
          placeholder="Value"
          required
          className="input"
          style={{ flex: 1, minWidth: 0 }}
        />
        <button type="submit" className="btn-submit" disabled={isPending} style={{ flexShrink: 0 }}>
          Add
        </button>
      </form>

    </Section>
  );
}

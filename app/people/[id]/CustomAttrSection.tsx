"use client";
import { useTransition } from "react";
import { addCustomAttribute, deleteCustomAttribute } from "./actions";
import type { SerialisedCustomAttribute } from "./types";
import Section from "@/components/layout/Section";

type Props = {
  personId: string;
  customAttributes: SerialisedCustomAttribute[];
};

export default function CustomAttrSection({
  personId,
  customAttributes,
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Section title="Custom Info">

      {customAttributes.length === 0 && (
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
          style={{ flex: 1 }}
        />
        <input
          name="value"
          placeholder="Value"
          required
          className="input"
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn-submit" disabled={isPending}>
          Add
        </button>
      </form>

    </Section>
  );
}
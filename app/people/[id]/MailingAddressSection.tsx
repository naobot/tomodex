"use client";
import { useTransition } from "react";
import { addMailingAddress, deleteMailingAddress } from "./actions";
import type { SerialisedMailingAddress } from "./types";
import Section from "@/components/layout/Section";

type Props = {
  personId: string;
  mailingAddresses: SerialisedMailingAddress[];
};

export default function MailingAddressSection({
  personId,
  mailingAddresses,
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Section title="Mailing Addresses">

      {mailingAddresses.length === 0 && (
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>
          No mailing addresses yet.
        </p>
      )}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px" }}>
        {mailingAddresses.map((a) => (
          <li
            key={a.id}
            style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "5px 0" }}
          >
            <div>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text)", whiteSpace: "pre-line", margin: 0 }}>
                {a.mailingAddress}
              </p>
              {a.label && (
                <p style={{ fontFamily: "var(--font-pixel)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-faint)", margin: "3px 0 0" }}>
                  {a.label}
                </p>
              )}
            </div>
            <button
              className="btn-destruct"
              onClick={() => startTransition(() => deleteMailingAddress(personId, a.id))}
              disabled={isPending}
              style={{ flexShrink: 0, marginLeft: 8 }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <form
        action={(fd) => startTransition(() => addMailingAddress(personId, fd))}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <input
          name="label"
          placeholder="Label (optional, e.g. Home)"
          className="input"
        />
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <textarea
            name="mailingAddress"
            placeholder="Mailing address"
            required
            rows={2}
            className="input textarea"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-submit" disabled={isPending}>
            Add
          </button>
        </div>
      </form>

    </Section>
  );
}
"use client";
import { useTransition } from "react";
import {
  addPhoneNumber,
  deletePhoneNumber,
  addEmailAddress,
  deleteEmailAddress,
} from "./actions";
import type {
  SerialisedPhoneNumber,
  SerialisedEmailAddress,
} from "./types";
import Section from "@/components/layout/Section";

type Props = {
  personId: string;
  phoneNumbers: SerialisedPhoneNumber[];
  emailAddresses: SerialisedEmailAddress[];
};

export default function ContactSection({
  personId,
  phoneNumbers,
  emailAddresses,
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Section title="Contact">

      {/* Phone numbers */}
      <div className="my-2">
        {phoneNumbers.length === 0 && (
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>
            No phone numbers yet.
          </p>
        )}
        <ul className="my-1">
          {phoneNumbers.map((p) => (
            <li key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0" }}>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}>
                {p.number}
                {p.label && (
                  <span style={{ fontFamily: "var(--font-pixel)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-faint)", marginLeft: 8 }}>
                    {p.label}
                  </span>
                )}
              </div>
              <button
                className="btn-destruct"
                onClick={() => startTransition(() => deletePhoneNumber(personId, p.id))}
                disabled={isPending}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form
          action={(fd) => startTransition(() => addPhoneNumber(personId, fd))}
          style={{ display: "flex", gap: 8, marginTop: 10 }}
        >
          <input name="label" placeholder="Label" className="input" style={{ width: 88, flexShrink: 0 }} />
          <input name="number" placeholder="Phone number" required className="input" style={{ flex: 1 }} />
          <button type="submit" className="btn-submit" disabled={isPending}>Add</button>
        </form>
      </div>

      {/* Email addresses */}
      <div className="my-2">
        {emailAddresses.length === 0 && (
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>
            No email addresses yet.
          </p>
        )}
        <ul className="my-1">
          {emailAddresses.map((e) => (
            <li key={e.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0" }}>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}>
                {e.address}
                {e.label && (
                  <span style={{ fontFamily: "var(--font-pixel)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-faint)", marginLeft: 8 }}>
                    {e.label}
                  </span>
                )}
              </div>
              <button
                className="btn-destruct"
                onClick={() => startTransition(() => deleteEmailAddress(personId, e.id))}
                disabled={isPending}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form
          action={(fd) => startTransition(() => addEmailAddress(personId, fd))}
          style={{ display: "flex", gap: 8, marginTop: 10 }}
        >
          <input name="label" placeholder="Label" className="input" style={{ width: 88, flexShrink: 0 }} />
          <input name="address" type="email" placeholder="Email address" required className="input" style={{ flex: 1 }} />
          <button type="submit" className="btn-submit" disabled={isPending}>Add</button>
        </form>
      </div>

    </Section>
  );
}
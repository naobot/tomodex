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
import Button from "@/components/ui/Button";
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
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Phone
        </h3>
        {phoneNumbers.length === 0 && (
          <p className="text-sm text-gray-400">No phone numbers yet.</p>
        )}
        <ul className="my-1">
          {phoneNumbers.map((p) => (
            <li key={p.id} className="flex items-center justify-between text-sm">
              <span>
                {p.number}
                {p.label && (
                  <span className="ml-2 text-gray-400">({p.label})</span>
                )}
              </span>
              <button
                onClick={() =>
                  startTransition(() => deletePhoneNumber(personId, p.id))
                }
                disabled={isPending}
                className="text-xs text-red-400 hover:text-red-600 disabled:opacity-40"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form
          action={(fd) => startTransition(() => addPhoneNumber(personId, fd))}
          className="flex gap-2"
        >
          <input
            name="label"
            placeholder="Label (optional)"
            className="w-28 rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            name="number"
            placeholder="Phone number"
            required
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="disabled:opacity-50 text-pixel text-sm"
          >
            Add
          </Button>
        </form>
      </div>

      {/* Email addresses */}
      <div className="my-2">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Email
        </h3>
        {emailAddresses.length === 0 && (
          <p className="text-sm text-gray-400">No email addresses yet.</p>
        )}
        <ul className="my-1">
          {emailAddresses.map((e) => (
            <li key={e.id} className="flex items-center justify-between text-sm">
              <span>
                {e.address}
                {e.label && (
                  <span className="ml-2 text-gray-400">({e.label})</span>
                )}
              </span>
              <button
                onClick={() =>
                  startTransition(() => deleteEmailAddress(personId, e.id))
                }
                disabled={isPending}
                className="text-xs text-red-400 hover:text-red-600 disabled:opacity-40"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form
          action={(fd) => startTransition(() => addEmailAddress(personId, fd))}
          className="flex gap-2"
        >
          <input
            name="label"
            placeholder="Label (optional)"
            className="w-28 rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            name="address"
            type="email"
            placeholder="Email address"
            required
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="disabled:opacity-50 text-pixel text-sm"
          >
            Add
          </Button>
        </form>
      </div>
    </Section>
  );
}
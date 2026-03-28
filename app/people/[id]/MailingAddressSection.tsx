"use client";

import { useTransition } from "react";
import { addMailingAddress, deleteMailingAddress } from "./actions";
import type { SerialisedMailingAddress } from "./types";
import Button from "@/components/ui/Button";
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
        <p className="text-sm text-gray-400">No mailing addresses yet.</p>
      )}
      <ul className="my-2">
        {mailingAddresses.map((a) => (
          <li
            key={a.id}
            className="flex items-start justify-between rounded border border-gray-200 px-3 py-2 text-sm"
          >
            <div>
              <p className="whitespace-pre-line">{a.mailingAddress}</p>
              {a.label && (
                <p className="text-gray-400 text-xs mt-0.5">{a.label}</p>
              )}
            </div>
            <Button
              type="submit"
              onClick={() => startTransition(() => deleteMailingAddress(personId, a.id))}
              disabled={isPending}
              className="text-xs text-red-400 hover:text-red-600 disabled:opacity-40 text-pixel shrink-0"
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>

      <form
        action={(fd) => startTransition(() => addMailingAddress(personId, fd))}
        className="my-2"
      >
        <input
          name="label"
          placeholder="Label (optional, e.g. Home)"
          className="w-full rounded border border-gray-300 px-2 py-1 my-2 text-sm"
        />
        <div className="flex gap-2 items-center">
          <textarea
            name="mailingAddress"
            placeholder="Mailing address"
            required
            rows={2}
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm resize-none"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="disabled:opacity-50 text-pixel text-sm"
          >
            Add
          </Button>
        </div>
      </form>
    </Section>
  );
}
"use client";

import { useTransition } from "react";
import { addAddress, deleteAddress } from "./actions";
import type { SerialisedAddress } from "./types";

type Props = {
  personId: string;
  addresses: SerialisedAddress[];
};

export default function AddressSection({ personId, addresses }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Addresses</h2>

      {addresses.length === 0 && (
        <p className="text-sm text-gray-400">No addresses yet.</p>
      )}
      <ul className="space-y-2">
        {addresses.map((a) => (
          <li
            key={a.id}
            className="flex items-start justify-between rounded border border-gray-200 px-3 py-2 text-sm"
          >
            <div>
              <p className="whitespace-pre-line">{a.mailingAddress}</p>
              {a.country && <p className="text-gray-500">{a.country}</p>}
              {a.label && <p className="text-gray-400 text-xs">{a.label}</p>}
            </div>
            <button
              onClick={() =>
                startTransition(() => deleteAddress(personId, a.id))
              }
              disabled={isPending}
              className="ml-4 text-xs text-red-400 hover:text-red-600 disabled:opacity-40 shrink-0"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <form
        action={(fd) => startTransition(() => addAddress(personId, fd))}
        className="space-y-2"
      >
        <div className="flex gap-2">
          <input
            name="label"
            placeholder="Label (optional, e.g. Home)"
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            name="country"
            placeholder="Country (optional)"
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <textarea
            name="mailingAddress"
            placeholder="Mailing address"
            required
            rows={2}
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm resize-none"
          />
          <button
            type="submit"
            disabled={isPending}
            className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700 disabled:opacity-50 self-end"
          >
            Add
          </button>
        </div>
      </form>
    </section>
  );
}
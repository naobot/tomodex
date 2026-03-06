"use client";

import { useTransition } from "react";
import { addCustomAttribute, deleteCustomAttribute } from "./actions";
import type { SerialisedCustomAttribute } from "./types";
import Button from "@/components/ui/Button";

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
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Custom Info</h2>

      {customAttributes.length === 0 && (
        <p className="text-sm text-gray-400">No custom attributes yet.</p>
      )}
      <ul className="divide-y divide-gray-100 rounded border border-gray-200">
        {customAttributes.map((attr) => (
          <li
            key={attr.id}
            className="flex items-center justify-between px-3 py-2 text-sm"
          >
            <span>
              <span className="font-medium text-gray-700">{attr.key}:</span>{" "}
              <span className="text-gray-600">{attr.value}</span>
            </span>
            <Button
              onClick={() =>
                startTransition(() =>
                  deleteCustomAttribute(personId, attr.id)
                )
              }
              disabled={isPending}
              className="ml-4 text-pixel text-xs text-red-400 hover:text-red-600 disabled:opacity-40"
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>

      <form
        action={(fd) =>
          startTransition(() => addCustomAttribute(personId, fd))
        }
        className="flex gap-2"
      >
        <input
          name="key"
          placeholder="Label (e.g. Favourite tea)"
          required
          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
        />
        <input
          name="value"
          placeholder="Value"
          required
          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="px-3 py-1 text-sm text-pixel disabled:opacity-50"
        >
          Add
        </Button>
      </form>
    </section>
  );
}
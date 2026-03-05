"use client";

import { useTransition } from "react";
import { upsertLocation, clearLocation } from "./actions";
import type { SerialisedLocation } from "./types";

type Props = {
  personId: string;
  location: SerialisedLocation;
};

export default function LocationSection({ personId, location }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Location</h2>

      {/* Current location display */}
      {location ? (
        <div className="flex items-center justify-between rounded border border-gray-200 px-3 py-2 text-sm">
          <span>
            {[location.city, location.country].filter(Boolean).join(", ")}
          </span>
          <button
            onClick={() => startTransition(() => clearLocation(personId))}
            disabled={isPending}
            className="ml-4 text-xs text-red-400 hover:text-red-600 disabled:opacity-40"
          >
            Clear
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-400">No location set.</p>
      )}

      {/* Upsert form — same form whether setting for the first time or updating */}
      <form
        action={(fd) => startTransition(() => upsertLocation(personId, fd))}
        className="flex gap-2"
      >
        <input
          name="city"
          placeholder="City"
          defaultValue={location?.city ?? ""}
          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
        />
        <input
          name="country"
          placeholder="Country"
          defaultValue={location?.country ?? ""}
          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {location ? "Update" : "Set"}
        </button>
      </form>
    </section>
  );
}
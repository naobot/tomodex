"use client";

import { useTransition } from "react";
import { upsertLocation } from "./actions";
import type { SerialisedLocation } from "./types";
import Button from "@/components/ui/Button";
import Section from "@/components/layout/Section";

type Props = {
  personId: string;
  location: SerialisedLocation;
};

export default function LocationSection({ personId, location }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Section title="Location">

      {/* Current location display */}
      {location ? (
        <div className="flex items-center justify-between rounded border border-gray-200 px-3 py-2 my-2 text-sm">
          <span>
            {[location.city, location.country].filter(Boolean).join(", ")}
          </span>

          <Button
            type="submit"
            disabled={isPending}
            className="text-xs text-red-400 hover:text-red-600 disabled:opacity-40 text-pixel"
          >
            Clear
          </Button>
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
        <Button
          type="submit"
          disabled={isPending}
          className="disabled:opacity-50 text-pixel text-sm"
        >
          {location ? "Update" : "Set"}
        </Button>
      </form>
    </Section>
  );
}
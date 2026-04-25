"use client";
import { useTransition } from "react";
import { upsertLocation, clearLocation } from "./actions";
import type { SerialisedLocation } from "./types";
import Section from "@/components/layout/Section";

type Props = {
  personId: string;
  location: SerialisedLocation;
};

export default function LocationSection({ personId, location }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Section title="Location">

      {location ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0", marginBottom: 8 }}>
          <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}>
            {[location.city, location.country].filter(Boolean).join(", ")}
          </span>
          <button
            className="btn-destruct"
            onClick={() => startTransition(() => clearLocation(personId))}
            disabled={isPending}
          >
            Clear
          </button>
        </div>
      ) : (
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)", marginBottom: 8 }}>
          No location set.
        </p>
      )}

      <form
        action={(fd) => startTransition(() => upsertLocation(personId, fd))}
        style={{ display: "flex", gap: 8 }}
      >
        <input
          name="city"
          placeholder="City"
          defaultValue={location?.city ?? ""}
          className="input"
          style={{ flex: 1 }}
        />
        <input
          name="country"
          placeholder="Country"
          defaultValue={location?.country ?? ""}
          className="input"
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn-submit" disabled={isPending}>
          {location ? "Update" : "Set"}
        </button>
      </form>

    </Section>
  );
}
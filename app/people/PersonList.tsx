"use client";

import { useTransition } from "react";
import { addPerson, deletePerson } from "./actions";

// A plain serialisable shape — Prisma model types aren't safe to pass
// across the server/client boundary directly (they may contain Dates, etc.)
type PersonSummary = {
  id: string;
  displayName: string;
  createdAt: string; // ISO string — Dates are serialised before crossing the boundary
};

type Props = {
  people: PersonSummary[];
};

export default function PersonList({ people }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(personId: string) {
    startTransition(async () => {
      await deletePerson(personId);
    });
  }

  return (
    <div className="space-y-6">
      {/* Add person form — Server Action wired directly to the form action */}
      <form
        action={addPerson}
        className="flex gap-2"
      >
        <input
          type="text"
          name="displayName"
          placeholder="Add a person…"
          required
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {/* People list */}
      {people.length === 0 ? (
        <p className="text-sm text-gray-500">
          No people yet. Add someone above to get started.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
          {people.map((person) => (
            <li
              key={person.id}
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="text-sm font-medium text-gray-900">
                {person.displayName}
              </span>
              <button
                onClick={() => handleDelete(person.id)}
                disabled={isPending}
                className="text-xs text-red-500 hover:text-red-700 disabled:opacity-40"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
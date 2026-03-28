"use client";

import { useState, useTransition } from "react";
import { addNote, updateNote, deleteNote } from "./actions";
import type { SerialisedNote } from "./types";
import Button from "@/components/ui/Button";
import Section from "@/components/layout/Section";

type Props = {
  personId: string;
  notes: SerialisedNote[];
};

function NoteItem({
  personId,
  note,
  isPending,
  startTransition,
}: {
  personId: string;
  note: SerialisedNote;
  isPending: boolean;
  startTransition: (fn: () => Promise<void>) => void;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <li className="rounded border border-indigo-300 bg-indigo-50 p-3">
        <form
          action={(fd) => {
            startTransition(() => updateNote(personId, note.id, fd));
            setEditing(false);
          }}
          className="my-2"
        >
          <textarea
            name="body"
            defaultValue={note.body}
            required
            rows={3}
            autoFocus
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm resize-none"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="rounded border border-gray-200 p-3 text-sm my-1">
      <p className="whitespace-pre-wrap">{note.body}</p>
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span>
          {note.updatedAt !== note.createdAt ? "Edited " : ""}
          {new Date(note.updatedAt).toLocaleDateString()}
        </span>
        <Button
          onClick={() => setEditing(true)}
          className="text-sm text-pixel"
        >
          Edit
        </Button>
        <Button
          onClick={() => startTransition(() => deleteNote(personId, note.id))}
          disabled={isPending}
          className="text-sm text-pixel text-red-400 hover:text-red-600 disabled:opacity-40"
        >
          Delete
        </Button>
      </div>
    </li>
  );
}

export default function NotesSection({ personId, notes }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Section title="Notes">
      {notes.length === 0 ? (
        <p className="text-sm text-gray-400 my-4">No notes yet.</p>
      ) :
      <ul className="my-2">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            personId={personId}
            note={note}
            isPending={isPending}
            startTransition={startTransition}
          />
        ))}
      </ul>}

      <form
        action={(fd) => startTransition(() => addNote(personId, fd))}
        className="flex gap-2 content-center items-center"
      >
        <textarea
          name="body"
          placeholder="Add a note…"
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
      </form>
    </Section>
  );
}
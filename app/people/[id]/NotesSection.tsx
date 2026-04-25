"use client";
import { useState, useTransition } from "react";
import { addNote, updateNote, deleteNote } from "./actions";
import type { SerialisedNote } from "./types";
import Section from "@/components/layout/Section";

type Props = {
  personId: string;
  notes: SerialisedNote[];
};

function formatNoteDate(updatedAt: string, createdAt: string): string {
  const date = new Date(updatedAt);
  const edited = updatedAt !== createdAt;
  const formatted = date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return edited ? `Edited ${formatted}` : formatted;
}

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
      <li style={{
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: 14,
        marginBottom: 8,
        boxShadow: "var(--shadow-sm)",
      }}>
        <form
          action={(fd) => {
            startTransition(() => updateNote(personId, note.id, fd));
            setEditing(false);
          }}
        >
          <textarea
            name="body"
            defaultValue={note.body}
            required
            rows={3}
            autoFocus
            className="input textarea"
            style={{ width: "100%", marginBottom: 8 }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" disabled={isPending} className="btn-submit">Save</button>
            <button type="button" className="btn" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li style={{
      background: "var(--color-surface-raised)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
      padding: 14,
      marginBottom: 8,
      boxShadow: "var(--shadow-sm)",
    }}>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text)", lineHeight: 1.65, margin: 0, whiteSpace: "pre-wrap" }}>
        {note.body}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8 }}>
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: 10, color: "var(--color-text-faint)", letterSpacing: "0.04em" }}>
          {formatNoteDate(note.updatedAt, note.createdAt)}
        </span>
        <button className="btn-inline" onClick={() => setEditing(true)}>Edit</button>
        <button
          className="btn-destruct"
          onClick={() => startTransition(() => deleteNote(personId, note.id))}
          disabled={isPending}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default function NotesSection({ personId, notes }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Section title="Notes">
      {notes.length === 0 && (
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>No notes yet.</p>
      )}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px" }}>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            personId={personId}
            note={note}
            isPending={isPending}
            startTransition={startTransition}
          />
        ))}
      </ul>
      <form
        action={(fd) => startTransition(() => addNote(personId, fd))}
        style={{ display: "flex", gap: 8, alignItems: "flex-end" }}
      >
        <textarea
          name="body"
          placeholder="Add a note…"
          required
          rows={2}
          className="input textarea"
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn-submit" disabled={isPending}>Add</button>
      </form>
    </Section>
  );
}
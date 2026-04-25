"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addPerson } from "./actions";
import type { PersonSummary } from "@/lib/people";
import styles from "./PersonList.module.css";
import { useNavigationLoader, usePreviousPathname } from "@/lib/NavigationContext";

type Props = {
  people: PersonSummary[];
};

const MAX_STAGGER_MS = 300;

export default function PersonList({ people }: Props) {
  const [isPending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { startNavigating } = useNavigationLoader();
  const router = useRouter();

  const previousPathname = usePreviousPathname();
  const shouldAnimate = previousPathname === "/";

  function openModal() {
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
    formRef.current?.reset();
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const { id } = await addPerson(formData);
      closeModal();
      router.push(`/people/${id}`);
    });
  }

  const staggerStep = people.length > 1
    ? MAX_STAGGER_MS / (people.length - 1)
    : 0;

  return (
    <>
      {people.length === 0 ? (
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>
          Add your first friend to get started.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {people.map((person, i) => (
            <li
              key={person.id}
              className={shouldAnimate ? styles.item : undefined}
              style={shouldAnimate
                ? { animationDelay: `${Math.round(i * staggerStep)}ms` }
                : undefined
              }
            >
              <button
                onClick={() => { startNavigating(); router.push(`/people/${person.id}`); }}
                style={{
                  background: "none",
                  border: "none",
                  padding: "2px 0",
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "var(--text-2xl)", fontWeight: 300, color: "var(--color-text-faint)" }}>
                  {person.displayName}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: 0,
          boxShadow: "var(--shadow-lg)",
          width: "100%",
          maxWidth: 420,
          margin: "auto",
        }}
        onClose={closeModal}
      >
        <div style={{ padding: "24px 28px" }}>
          <div style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--color-text)",
            marginBottom: 20,
          }}>
            Add a Friend
          </div>
          <form ref={formRef} action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <div>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-faint)", marginBottom: 5 }}>
                Display name <span style={{ color: "var(--color-accent)" }}>*</span>
              </div>
              <input
                name="displayName"
                type="text"
                required
                autoFocus
                placeholder="e.g. Sarah"
                className="input"
                style={{ width: "100%" }}
              />
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, color: "var(--color-text-faint)", marginTop: 4, letterSpacing: "0.04em" }}>
                How their name appears throughout the app.
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-faint)", marginBottom: 5 }}>
                Full name
              </div>
              <input
                name="fullName"
                type="text"
                placeholder="e.g. Sarah Jane Smith"
                className="input"
                style={{ width: "100%" }}
              />
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, color: "var(--color-text-faint)", marginTop: 4, letterSpacing: "0.04em" }}>
                Optional
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, paddingTop: 4 }}>
              <button type="button" className="btn" onClick={closeModal}>Cancel</button>
              <button type="submit" className="btn-submit" disabled={isPending}>
                {isPending ? "Adding…" : "Add Friend"}
              </button>
            </div>

          </form>
        </div>
      </dialog>
    </>
  );
}
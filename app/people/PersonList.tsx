"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addPerson } from "./actions";
import Button from "@/components/ui/Button";
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

  // Spread the stagger evenly across MAX_STAGGER_MS regardless of list length
  const staggerStep = people.length > 1
    ? MAX_STAGGER_MS / (people.length - 1)
    : 0;

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Button onClick={openModal} className="text-sm text-pixel">
          + Add Friend
        </Button>
      </div>

      {people.length === 0 ? (
        <p className="text-sm text-gray-400">Add your first friend to get started.</p>
      ) : (
        <ul>
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
                onClick={() => { startNavigating(); router.push(`/people/${person.id}`)}}
                className="flex items-center justify-between p-0 -my-2 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-2xl">{person.displayName}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        className="rounded-xl border border-gray-200 p-0 shadow-xl backdrop:bg-black/30 w-full max-w-md m-auto"
        onClose={closeModal}
      >
        <div className="px-6 py-5">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Add a Friend</h2>
          <form ref={formRef} action={handleSubmit} className="space-y-4">
            <label className="block space-y-1">
              <span className="text-sm font-medium text-gray-700">
                Display name <span className="text-red-500">*</span>
              </span>
              <input
                name="displayName"
                type="text"
                required
                autoFocus
                placeholder="e.g. Sarah"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <p className="text-xs text-gray-400">How their name appears throughout the app.</p>
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-gray-700">Full name</span>
              <input
                name="fullName"
                type="text"
                placeholder="e.g. Sarah Jane Smith"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <p className="text-xs text-gray-400">(Optional)</p>
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" onClick={closeModal} className="text-sm text-pixel">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="text-sm text-pixel disabled:opacity-50">
                {isPending ? "Adding…" : "Add Friend"}
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
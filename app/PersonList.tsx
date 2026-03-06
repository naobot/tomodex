"use client";

import { useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import { addPerson } from "./people/actions";

type PersonSummary = {
  id: string;
  displayName: string;
  updatedAt: string;
};

type Props = {
  people: PersonSummary[];
};

export default function PersonList({ people }: Props) {
  const [isPending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

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

  return (
    <>
      {/* List header */}
      <div className="mb-4 flex items-center justify-between">
        {/*<p className="text-sm text-pixel">
          {people.length === 0
            ? "No friends yet."
            : `${people.length} friend${people.length === 1 ? "" : "s"}`}
        </p>*/}
        <Button
          onClick={openModal}
          className="text-sm text-pixel"
        >
          + Add Friend
        </Button>
      </div>

      {/* Friends list */}
      {people.length === 0 ? (
        <p className="text-sm text-gray-400">
          Add your first friend to get started.
        </p>
      ) : (
        <ul>
          {people.map((person) => (
            <li key={person.id}>
              <Link
                href={`/people/${person.id}`}
                className="flex items-center justify-between p-0 -my-2 hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">
                  {person.displayName}
                </span>
                {/*<span className="text-xs text-gray-400">→</span>*/}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Add Friend modal */}
      <dialog
        ref={dialogRef}
        className="rounded-xl border border-gray-200 p-0 shadow-xl backdrop:bg-black/30 w-full max-w-md m-auto"
        onClose={closeModal}
      >
        <div className="px-6 py-5">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Add a Friend
          </h2>
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
              <p className="text-xs text-gray-400">
                How their name appears throughout the app.
              </p>
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-gray-700">
                Full name
              </span>
              <input
                name="fullName"
                type="text"
                placeholder="e.g. Sarah Jane Smith"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <p className="text-xs text-gray-400">(Optional)</p>
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                onClick={closeModal}
                className="text-sm text-pixel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="text-sm text-pixel disabled:opacity-50"
              >
                {isPending ? "Adding…" : "Add Friend"}
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
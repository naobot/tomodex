"use client";

import styles from "./PersonDetail.module.css";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { updatePerson } from "./actions";
import ContactSection from "./ContactSection";
import LocationSection from "./LocationSection";
import MailingAddressSection from "./MailingAddressSection";
import NotesSection from "./NotesSection";
import CustomAttrSection from "./CustomAttrSection";
import type { SerialisedPerson } from "./types";
import Button from "@/components/ui/Button";

// Month names for birthday display — birthMonth is 1-indexed
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatBirthday(
  day: number | null,
  month: number | null,
  year: number | null
): string | null {
  if (!day && !month && !year) return null;
  const parts: string[] = [];
  if (month) parts.push(MONTHS[month - 1]);
  if (day) parts.push(String(day));
  if (year) parts.push(String(year));
  return parts.join(" ");
}

type Props = {
  person: SerialisedPerson;
};

export default function PersonDetail({ person }: Props) {
  // const [isPending, startTransition] = useTransition();
  // const [editIsOpen, editIsOpenSet] = useState(false);

  const birthday = formatBirthday(
    person.birthDay,
    person.birthMonth,
    person.birthYear
  );

  const currentAge = (() => {
    if (!person.birthYear || !person.birthMonth || !person.birthDay) return '';
    const today = new Date();
    const age = today.getFullYear() - person.birthYear;
    const hasHadBirthdayThisYear =
      today.getMonth() + 1 > person.birthMonth ||
      (today.getMonth() + 1 === person.birthMonth && today.getDate() >= person.birthDay);
    return String(hasHadBirthdayThisYear ? age : age - 1);
  })();

  return (
    <div className={styles.root}>
      <div className={styles.PersonDetailHeader}>
        <div>
          <Link
            href="/people"
            className="inline-block text-sm text-pixel uppercase"
          >
            ←
          </Link>
        </div>
        <div>
          <h1 className="inline-block text-3xl">
            {person.displayName}
          </h1>
        </div>
      </div>

      {/* Header / core fields */}
      <section className={styles.Summary}>
        {/* Edit core fields */}
        {person.fullName && (
          <p className="text-gray-500 text-sm">
            {person.fullName}
            {currentAge && <>, {`${currentAge}`}</>}
          </p>
        )}
        {birthday && (
          <p className="text-sm text-gray-500">🎂 {birthday}</p>
        )}
        {/*Edit*/}
          {/*<fieldset disabled={isPending}>
            <form
              action={(fd) =>
                startTransition(async () => {
                  await updatePerson(person.id, fd)
                  editIsOpenSet(false)
                })
              }
              className="mt-3 space-y-3 flex flex-col"
            >
              <div className="flex gap-2">
                <label className="flex-1 space-y-1">
                  <span className="text-xs text-gray-500">Display name *</span>
                  <input
                    name="displayName"
                    defaultValue={person.displayName}
                    required
                    className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                  />
                </label>
                <label className="flex-1 space-y-1">
                  <span className="text-xs text-gray-500">Full name</span>
                  <input
                    name="fullName"
                    defaultValue={person.fullName ?? ""}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <label className="space-y-1">
                  <span className="text-xs text-gray-500">Birth day</span>
                  <input
                    name="birthDay"
                    type="number"
                    min={1}
                    max={31}
                    defaultValue={person.birthDay ?? ""}
                    className="w-20 rounded border border-gray-300 px-2 py-1 mx-1 text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs text-gray-500">Birth month</span>
                  <input
                    name="birthMonth"
                    type="number"
                    min={1}
                    max={12}
                    defaultValue={person.birthMonth ?? ""}
                    className="w-20 rounded border border-gray-300 px-2 py-1 mx-1 text-sm"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs text-gray-500">Birth year</span>
                  <input
                    name="birthYear"
                    type="number"
                    min={1900}
                    max={new Date().getFullYear()}
                    defaultValue={person.birthYear ?? ""}
                    className="w-24 rounded border border-gray-300 px-2 py-1 mx-1 text-sm"
                  />
                </label>
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="disabled:opacity-50 text-pixel text-sm"
              >
                Save
              </Button>
            </form>
          </fieldset>*/}
      </section>

      {/*<hr className="border-gray-100" />

      <ContactSection
        personId={person.id}
        phoneNumbers={person.phoneNumbers}
        emailAddresses={person.emailAddresses}
      />

      <hr className="border-gray-100" />

      <LocationSection personId={person.id} location={person.location} />

      <hr className="border-gray-100" />

      <MailingAddressSection
        personId={person.id}
        mailingAddresses={person.mailingAddresses}
      />

      <hr className="border-gray-100" />

      <NotesSection personId={person.id} notes={person.notes} />

      <hr className="border-gray-100" />

      <CustomAttrSection
        personId={person.id}
        customAttributes={person.customAttributes}
      />*/}
    </div>
  );
}
"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { updatePerson } from "./actions";
import ContactSection from "./ContactSection";
import LocationSection from "./LocationSection";
import MailingAddressSection from "./MailingAddressSection";
import NotesSection from "./NotesSection";
import CustomAttrSection from "./CustomAttrSection";
import type { SerialisedPerson } from "./types";

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
  const [isPending, startTransition] = useTransition();
  const [editIsOpen, editIsOpenSet] = useState(false);

  const birthday = formatBirthday(person.birthDay, person.birthMonth, person.birthYear);

  return (
    <div>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <Link
          href="/people"
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: 13,
            color: "var(--color-text-faint)",
            lineHeight: 1,
            textDecoration: "none",
            userSelect: "none",
          }}
        >
          ‹
        </Link>
        <span style={{
          fontFamily: "var(--font-pixel)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--color-text)",
        }}>
          Profile
        </span>
      </div>

      {/* Name row */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
        <h1 style={{
          fontSize: "var(--text-3xl)",
          fontWeight: 200,
          color: "var(--color-text-strong)",
          margin: 0,
          lineHeight: 1.1,
        }}>
          {person.displayName}
        </h1>
        <button
          className="btn"
          style={{ fontSize: 10, padding: "4px 12px" }}
          onClick={() => editIsOpenSet(o => !o)}
        >
          {editIsOpen ? "▲ Close" : "▼ Edit"}
        </button>
      </div>

      {/* Meta — hidden while accordion is open */}
      {!editIsOpen && (
        <div style={{ marginBottom: 14 }}>
          {person.fullName && (
            <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)", lineHeight: 1.4 }}>
              {person.fullName}
            </p>
          )}
          {birthday && (
            <p style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-text-faint)",
              marginTop: 3,
            }}>
              {birthday}
            </p>
          )}
        </div>
      )}

      {/* Edit accordion */}
      {editIsOpen && (
        <div style={{
          background: "var(--color-surface-raised)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          padding: "16px 18px 18px",
          marginBottom: 16,
          boxShadow: "var(--shadow-sm)",
        }}>
          <fieldset disabled={isPending} style={{ border: "none", padding: 0, margin: 0 }}>
            <form
              action={(fd) =>
                startTransition(async () => {
                  await updatePerson(person.id, fd);
                  editIsOpenSet(false);
                })
              }
            >
              {/* Display name + Full name */}
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-faint)", marginBottom: 5 }}>
                    Display name <span style={{ color: "var(--color-accent)" }}>*</span>
                  </div>
                  <input
                    name="displayName"
                    defaultValue={person.displayName}
                    required
                    className="input"
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-faint)", marginBottom: 5 }}>
                    Full name
                  </div>
                  <input
                    name="fullName"
                    defaultValue={person.fullName ?? ""}
                    className="input"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              {/* Birthday */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-faint)", marginBottom: 5 }}>
                  Birthday
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <input name="birthMonth" type="number" min={1} max={12} placeholder="MM" defaultValue={person.birthMonth ?? ""} className="input" style={{ width: "100%", textAlign: "center" }} />
                    <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, color: "var(--color-text-faint)", marginTop: 4, textAlign: "center", letterSpacing: "0.04em" }}>Month</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <input name="birthDay" type="number" min={1} max={31} placeholder="DD" defaultValue={person.birthDay ?? ""} className="input" style={{ width: "100%", textAlign: "center" }} />
                    <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, color: "var(--color-text-faint)", marginTop: 4, textAlign: "center", letterSpacing: "0.04em" }}>Day</div>
                  </div>
                  <div style={{ flex: 2 }}>
                    <input name="birthYear" type="number" min={1900} max={new Date().getFullYear()} placeholder="YYYY" defaultValue={person.birthYear ?? ""} className="input" style={{ width: "100%", textAlign: "center" }} />
                    <div style={{ fontFamily: "var(--font-pixel)", fontSize: 10, color: "var(--color-text-faint)", marginTop: 4, textAlign: "center", letterSpacing: "0.04em" }}>Year</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
                <button type="button" className="btn" onClick={() => editIsOpenSet(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Save
                </button>
              </div>
            </form>
          </fieldset>
        </div>
      )}

      <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "16px 0" }} />
      <ContactSection personId={person.id} phoneNumbers={person.phoneNumbers} emailAddresses={person.emailAddresses} />

      <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "16px 0" }} />
      <LocationSection personId={person.id} location={person.location} />

      <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "16px 0" }} />
      <MailingAddressSection personId={person.id} mailingAddresses={person.mailingAddresses} />

      <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "16px 0" }} />
      <NotesSection personId={person.id} notes={person.notes} />

      <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "16px 0" }} />
      <CustomAttrSection personId={person.id} customAttributes={person.customAttributes} />

    </div>
  );
}
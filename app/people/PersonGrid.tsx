"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNavigationLoader } from "@/lib/NavigationContext";
import type { PersonGridItem } from "@/lib/people";
import styles from "./PersonList.module.css";

const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatBirthday(day: number | null, month: number | null, year: number | null): string | null {
  if (!day || !month) return null;
  const base = `${day} ${MONTH_ABBR[month - 1]}`;
  return year ? `${base} · ${year}` : base;
}

type Props = {
  people: PersonGridItem[];
};

export default function PersonGrid({ people }: Props) {
  const [query, setQuery] = useState("");
  const { startNavigating } = useNavigationLoader();
  const router = useRouter();

  const filtered = query
    ? people.filter((p) =>
        p.displayName.toLowerCase().includes(query.toLowerCase()) ||
        (p.fullName ?? "").toLowerCase().includes(query.toLowerCase())
      )
    : people;

  return (
    <div>
      <input
        className="input"
        style={{ width: "100%", marginBottom: 20 }}
        placeholder="Search friends…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p style={{
          fontFamily: "var(--font-pixel)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--color-text-faint)",
          marginTop: 6,
        }}>
          {query ? "No results" : "No friends yet."}
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filtered.map((person, i) => {
            const location = [person.location?.city, person.location?.country]
              .filter(Boolean)
              .join(", ");
            const birthday = formatBirthday(person.birthDay, person.birthMonth, person.birthYear);
            const isLast = i === filtered.length - 1;

            return (
              <li
                key={person.id}
                className={styles.item}
                style={{ animationDelay: `${Math.round(i * (300 / Math.max(filtered.length - 1, 1)))}ms` }}
              >
                <button
                  onClick={() => { startNavigating(); router.push(`/people/${person.id}`); }}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "10px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    textAlign: "left",
                    borderBottom: isLast ? "none" : "1px solid var(--color-border)",
                  }}
                >
                  <div>
                    <span style={{
                      display: "block",
                      fontSize: "var(--text-xl)",
                      fontWeight: 300,
                      color: "var(--color-text-strong)",
                      lineHeight: 1.3,
                    }}>
                      {person.displayName}
                    </span>
                    {person.fullName && (
                      <span style={{
                        display: "block",
                        fontFamily: "var(--font-pixel)",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-text-faint)",
                        marginTop: 2,
                      }}>
                        {person.fullName}
                      </span>
                    )}
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                    {location && (
                      <span style={{
                        display: "block",
                        fontFamily: "var(--font-pixel)",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-text-faint)",
                        lineHeight: 1.4,
                      }}>
                        {location}
                      </span>
                    )}
                    {birthday && (
                      <span style={{
                        display: "block",
                        fontFamily: "var(--font-pixel)",
                        fontSize: 10,
                        color: "var(--color-text-faint)",
                        letterSpacing: "0.04em",
                        lineHeight: 1.4,
                        marginTop: location ? 2 : 0,
                      }}>
                        {birthday}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

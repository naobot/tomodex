"use client";
import { useRouter } from "next/navigation";
import { useNavigationLoader } from "@/lib/NavigationContext";
import styles from "./BirthdayListRow.module.css";
import { MONTH_ABBR } from "@/utils/months";

function formatDaysUntil(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${days} days`;
}

type Props = {
  id: string;
  displayName: string;
  birthDay?: number;
  birthMonth?: number;
  daysUntil?: number;
  faded?: boolean;
};

export default function BirthdayListRow({ id, displayName, birthDay, birthMonth, daysUntil, faded }: Props) {
  const { startNavigating } = useNavigationLoader();
  const router = useRouter();

  const hasBirthday = birthDay != null && birthMonth != null;

  return (
    <button
      onClick={() => { startNavigating(); router.push(`/people/${id}`); }}
      className={styles.row}
      style={{
        background: "none",
        border: "none",
        padding: "6px 4px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14,
        width: "100%",
        textAlign: "left",
        opacity: faded ? 0.5 : 1,
      }}
    >
      <div style={{
        width: 44, height: 44,
        background: "var(--color-surface-raised)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "var(--radius-sm)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {hasBirthday && (
          <>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-faint)", lineHeight: 1 }}>
              {MONTH_ABBR[birthMonth - 1]}
            </span>
            <span style={{ fontSize: "var(--text-md)", fontWeight: 300, color: "var(--color-text-strong)", lineHeight: 1.3 }}>
              {birthDay}
            </span>
          </>
        )}
      </div>

      <span style={{ fontSize: "var(--text-md)", fontWeight: 300, color: "var(--color-text-strong)", flex: 1 }}>
        {displayName}
      </span>

      {daysUntil != null && (
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-faint)" }}>
          {formatDaysUntil(daysUntil)}
        </span>
      )}
    </button>
  );
}

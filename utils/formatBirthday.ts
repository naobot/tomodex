import { MONTH_ABBR } from "./months";
import type { DateFormat } from "@/lib/settings";

export function formatBirthday(
  day: number | null,
  month: number | null,
  year: number | null,
  format: DateFormat = "DD_MONTH_YYYY",
): string | null {
  if (!day || !month) return null;

  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  const mon = MONTH_ABBR[month - 1];

  switch (format) {
    case "DD_MONTH_YYYY":
      return year ? `${day} ${mon} ${year}` : `${day} ${mon}`;
    case "MONTH_DD_YYYY":
      return year ? `${mon} ${day}, ${year}` : `${mon} ${day}`;
    case "DD_MM_YYYY":
      return year ? `${dd}/${mm}/${year}` : `${dd}/${mm}`;
    case "MM_DD_YYYY":
      return year ? `${mm}/${dd}/${year}` : `${mm}/${dd}`;
  }
}

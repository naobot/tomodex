import { MONTH_ABBR } from "./months";

export function formatBirthday(
  day: number | null,
  month: number | null,
  year: number | null,
): string | null {
  if (!day || !month) return null;
  const base = `${day} ${MONTH_ABBR[month - 1]}`;
  return year ? `${base} ${year}` : base;
}

const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function formatBirthday(
  day: number | null,
  month: number | null,
  year: number | null,
): string | null {
  if (!day || !month) return null;
  const base = `${day} ${MONTH_ABBR[month - 1]}`;
  return year ? `${base} ${year}` : base;
}

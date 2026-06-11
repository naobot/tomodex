import { prisma } from "@/lib/prisma";
import { withDb, type DbResult } from "@/lib/db";

export type BirthdayPerson = {
  id: string;
  displayName: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number | null;
  daysUntil: number;
};

export type BirthdaysData = {
  withBirthday: BirthdayPerson[];
  withoutBirthday: { id: string; displayName: string }[];
};

function computeDaysUntil(month: number, day: number, today: Date): number {
  const y = today.getFullYear();
  const todayMs = new Date(y, today.getMonth(), today.getDate()).getTime();
  const thisYearMs = new Date(y, month - 1, day).getTime();
  if (thisYearMs >= todayMs) {
    return Math.round((thisYearMs - todayMs) / 86400000);
  }
  return Math.round((new Date(y + 1, month - 1, day).getTime() - todayMs) / 86400000);
}

export async function getBirthdaysForUser(userId: string): Promise<DbResult<BirthdaysData>> {
  return withDb(async () => {
    const people = await prisma.person.findMany({
      where: { ownerId: userId },
      orderBy: { displayName: "asc" },
      select: {
        id: true,
        displayName: true,
        birthDay: true,
        birthMonth: true,
        birthYear: true,
      },
    });

    const today = new Date();
    const withBirthday: BirthdayPerson[] = [];
    const withoutBirthday: { id: string; displayName: string }[] = [];

    for (const p of people) {
      if (p.birthDay && p.birthMonth) {
        withBirthday.push({
          id: p.id,
          displayName: p.displayName,
          birthDay: p.birthDay,
          birthMonth: p.birthMonth,
          birthYear: p.birthYear,
          daysUntil: computeDaysUntil(p.birthMonth, p.birthDay, today),
        });
      } else {
        withoutBirthday.push({ id: p.id, displayName: p.displayName });
      }
    }

    withBirthday.sort((a, b) => a.daysUntil - b.daysUntil);

    return { withBirthday, withoutBirthday };
  });
}

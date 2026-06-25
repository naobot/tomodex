import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { withDb, type DbResult } from "@/lib/db";

export type DateFormat = "DD_MONTH_YYYY" | "MONTH_DD_YYYY" | "DD_MM_YYYY" | "MM_DD_YYYY";
export type FriendsOrder = "ADDED" | "ALPHA";

export type UserSettingsData = {
  dateFormat: DateFormat;
  friendsOrder: FriendsOrder;
};

export const DEFAULT_SETTINGS: UserSettingsData = {
  dateFormat: "DD_MONTH_YYYY",
  friendsOrder: "ADDED",
};

export const getUserSettings = cache(
  async (userId: string): Promise<DbResult<UserSettingsData>> => {
    return withDb(async () => {
      const row = await prisma.userSettings.findUnique({
        where: { userId },
        select: { dateFormat: true, friendsOrder: true },
      });
      return (row as UserSettingsData | null) ?? DEFAULT_SETTINGS;
    });
  }
);

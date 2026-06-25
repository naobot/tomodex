"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { DateFormat, FriendsOrder } from "@/lib/settings";

export async function saveDisplaySettings(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised");

  const dateFormat = formData.get("dateFormat") as DateFormat;
  const friendsOrder = formData.get("friendsOrder") as FriendsOrder;

  await prisma.userSettings.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, dateFormat, friendsOrder },
    update: { dateFormat, friendsOrder },
  });

  // Revalidate all pages that display dates or friend ordering
  revalidatePath("/", "layout");
}

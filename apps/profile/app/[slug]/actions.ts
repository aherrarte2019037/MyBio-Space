"use server";

import { db, profiles } from "@repo/db";
import { eq } from "drizzle-orm";

export async function getCreatorEmail(profileId: string) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, profileId),
    columns: {
      email: true,
    },
  });

  if (!profile) return { error: "Email not found" };

  return { email: profile.email };
}

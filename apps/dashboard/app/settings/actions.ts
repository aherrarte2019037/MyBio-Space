"use server";

import { db, Subscriptions } from "@repo/db";
import { LemonSqueezyApiUrl } from "@repo/utils";
import { eq } from "drizzle-orm";
import { BillingSubscriptionSchema } from "@/lib/schemas/billing";
import { getCurrentUser } from "@/lib/utils/current-user";
import { createClient } from "@/lib/utils/supabase/server";

export async function getManageSubscriptionUrl() {
  const supabase = await createClient();
  const user = await getCurrentUser(supabase);

  if (!user) throw new Error("Unauthorized");

  const subscription = await db.query.Subscriptions.findFirst({
    where: eq(Subscriptions.userId, user.id),
  });

  if (!subscription) {
    throw new Error("No active subscription found");
  }

  const response = await fetch(
    `${LemonSqueezyApiUrl}/subscriptions/${subscription.subscriptionId}`,
    {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch subscription");

  const data = await response.json();

  const parsedData = BillingSubscriptionSchema.safeParse(data);
  if (!parsedData.success) throw new Error("Invalid subscription data");

  const portalUrl = parsedData.data.data.attributes.urls.customer_portal;
  if (!portalUrl) throw new Error("Could not find customer portal URL");

  return portalUrl;
}

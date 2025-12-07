"use client";

import { Button } from "@repo/ui";
import { Loader2, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { When } from "react-if";
import { getManageBillingUrlAction } from "@/app/settings/actions";

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleManage = async () => {
    setLoading(true);
    const url = await getManageBillingUrlAction();
    router.push(url);
  };

  return (
    <Button variant="outline" onClick={handleManage} disabled={loading}>
      <When condition={loading}>
        <Loader2 className="mr-2 size-4 animate-spin" />
      </When>
      <When condition={!loading}>
        <Settings className="mr-2 size-4" />
      </When>
      Manage Subscription
    </Button>
  );
}

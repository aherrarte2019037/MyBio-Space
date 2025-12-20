import type { ProfileBlockData } from "@repo/db";
import type { Profile } from "@repo/db/src/schema/account.sql";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import { ShieldCheck } from "lucide-react";
import { When } from "react-if";

interface Props {
  profile: Profile;
  data: ProfileBlockData;
}

export function ProfileBlock({ profile, data }: Props) {
  const imageUrl = data.customAvatarUrl || profile.avatarUrl;
  const initials = profile.username.slice(0, 2).toUpperCase();
  const showVerified = profile.tier === "pro";

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Avatar className="size-24 border-4 border-white shadow-xl">
        <AvatarImage src={imageUrl} alt={profile.username} className="object-cover" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">{data.displayName || profile.username}</h1>

        {data.tagline && <p className="text-sm text-muted-foreground">{data.tagline}</p>}

        <When condition={showVerified}>
          <div className="flex items-center gap-1 text-xs text-green-800 bg-green-200 px-3 py-1 rounded-full font-medium">
            Verified
            <ShieldCheck size={12} strokeWidth={3} />
          </div>
        </When>
      </div>
    </div>
  );
}

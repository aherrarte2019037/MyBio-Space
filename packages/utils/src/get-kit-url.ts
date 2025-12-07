import type { MediaKit, Profile } from "@repo/db";

interface Props {
  kit: MediaKit;
  profile: Profile;
  includeBase?: boolean;
}

export const getKitUrl = ({ kit, profile, includeBase = true }: Props) => {
  const baseUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://kyt.one";

  const isDefault = kit.default;
  const url = isDefault ? profile.username : `${profile.username}/${kit.slug}`;

  return includeBase ? `${baseUrl}/${url}` : url;
};

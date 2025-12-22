import type { Profile, ProfileBlockData } from "@repo/db";

export const getDisplayUsername = (profile: Profile, profileBlock: ProfileBlockData) => {
  return profileBlock.displayName || profile.username;
};

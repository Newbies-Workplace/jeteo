import React from "react";
import { ProfileSettingsForm } from "@/app/settings/profile/ProfileSettingsForm";
import { getMyUser } from "@/lib/actions/users";

export default async function Page() {
  const user = await getMyUser();

  return <ProfileSettingsForm user={user} />;
}

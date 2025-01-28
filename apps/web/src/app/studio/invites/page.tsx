import { Text } from "@/components/atoms/text/Text";
import React from "react";
import { InviteCard } from "@/components/molecules/inviteCard/InviteCard";
import { getMyInvites } from "@/common/getInvite";

export default async function Page() {
  const invites = (await getMyInvites()) ?? [];

  return (
    <div className={"flex flex-col justify-center gap-4"}>
      <Text variant={"headM"} bold>
        Zaproszenia
      </Text>

      {invites.map((invite) => (
        <InviteCard key={invite.id} invite={invite} />
      ))}
    </div>
  );
}

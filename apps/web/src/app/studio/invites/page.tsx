import { Text } from "@/components/atoms/text/Text";
import React from "react";
import styles from "./page.module.scss";
import { InviteCard } from "@/components/molecules/inviteCard/InviteCard";
import { getMyInvites } from "@/common/getInvite";

export default async function Page() {
  const invites = (await getMyInvites()) ?? [];

  return (
    <div className={styles.container}>
      <Text variant={"headM"} bold>
        Zaproszenia
      </Text>

      {invites.map((invite) => (
        <InviteCard key={invite.id} invite={invite} />
      ))}
    </div>
  );
}

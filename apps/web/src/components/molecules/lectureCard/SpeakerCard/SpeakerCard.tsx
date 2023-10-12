import React from "react";
import styles from "./SpeakerCard.module.scss";
import { Text } from "@/components/atoms/text/Text";
import { Avatar } from "@/components/atoms/avatar/Avatar";
import { UserSocials } from "@/components/molecules/userSocials/UserSocials";

export interface SpeakerCardProps {
  avatar?: string;
  name: string;
  jobTitle?: string;
  socials?: {
    mail?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({
  avatar,
  name,
  jobTitle,
  socials,
}) => {
  return (
    <div className={styles.card}>
      <Avatar size={32} src={avatar} />
      <div className={styles.info}>
        <Text variant="bodyS" bold>
          {name}
        </Text>

        {jobTitle && <Text variant="bodyS">{jobTitle}</Text>}

        <UserSocials socials={socials} />
      </div>
    </div>
  );
};

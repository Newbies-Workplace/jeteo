import React from "react";
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
    <div
      className={
        "flex min-w-[150px] items-center self-stretch gap-2 p-2 rounded-lg border-[0.5px] border-stroke bg-surface"
      }
    >
      <Avatar size={52} src={avatar} />
      <div className={"flex flex-col min-w-[100px] max-w-[200px] gap-1"}>
        <Text variant="bodyM" bold>
          {name}
        </Text>

        {jobTitle && <Text variant="bodyS">{jobTitle}</Text>}

        <UserSocials socials={socials} size={"small"} />
      </div>
    </div>
  );
};

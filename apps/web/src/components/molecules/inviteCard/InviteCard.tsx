"use client";

import React from "react";
import Button from "@/components/atoms/button/Button";
import { Text } from "@/components/atoms/text/Text";
import { SpeakerCard } from "@/components/molecules/speakerCard/SpeakerCard";
import { Label } from "@/components/atoms/label/Label";
import { formatFromToDates } from "@/lib/dates";
import { InviteDetailsResponse } from "shared/model/invite/response/inviteResponse";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { acceptInvite, rejectInvite } from "@/lib/actions/invites";

export interface InviteCardProps {
  invite: InviteDetailsResponse;
}

export const InviteCard: React.FC<InviteCardProps> = ({ invite }) => {
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();

  const onAcceptPress = () => {
    toast
      .promise(acceptInvite(invite.id), {
        loading: "Akceptowanie zaproszenia...",
        success: <b>Zaproszenie zaakceptowano</b>,
        error: <b>Wystąpił błąd</b>,
      })
      .then(() => {
        router.refresh();
      });
  };

  const onRejectPress = () => {
    toast
      .promise(rejectInvite(invite.id), {
        loading: "Odrzucanie zaproszenia...",
        success: <b>Zaproszenie odrzucono</b>,
        error: <b>Wystąpił błąd</b>,
      })
      .then(() => {
        router.refresh();
      });
  };

  return (
    <div
      className={
        "flex p-4 flex-col items-start gap-4 self-stretch rounded-lg border border-stroke bg-surface"
      }
    >
      <Text>
        Witaj <Text bold>{user?.name}</Text> Zostań prelegentem w wydarzeniu{" "}
        <Text bold>{invite.event.title}</Text>!
      </Text>

      <div className={"flex justify-between items-start self-stretch"}>
        <div className={"flex flex-col items-start gap-2.5"}>
          <Text variant={"headS"} bold>
            {invite.lecture.title}
          </Text>

          <Label
            text={formatFromToDates(invite.lecture.from, invite.lecture.to)}
          />
        </div>

        <SpeakerCard
          name={invite.inviter.name}
          avatar={invite.inviter.avatar}
          jobTitle={invite.inviter.jobTitle}
          socials={invite.inviter.socials}
        />
      </div>

      <div className={"flex items-start gap-2.5 self-stretch"}>
        <Button primary className={"flex-grow"} onClick={onAcceptPress}>
          Akceptuj
        </Button>
        <Button className={"flex-grow"} onClick={onRejectPress}>
          Odrzuć
        </Button>
      </div>
    </div>
  );
};

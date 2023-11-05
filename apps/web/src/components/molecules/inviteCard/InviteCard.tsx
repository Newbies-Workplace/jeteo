"use client";

import React from "react";
import styles from "./InviteCard.module.scss";
import Button from "@/components/atoms/button/Button";
import { Text } from "@/components/atoms/text/Text";
import { SpeakerCard } from "@/components/molecules/speakerCard/SpeakerCard";
import { Label } from "@/components/atoms/label/Label";
import { formatFromToDates } from "@/common/utils";
import { useAuth } from "@/contexts/Auth.hook";
import { InviteDetailsResponse } from "shared/model/invite/response/inviteResponse";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { myFetch } from "@/common/fetch";

export interface InviteCardProps {
  invite: InviteDetailsResponse;
}

export const InviteCard: React.FC<InviteCardProps> = ({ invite }) => {
  const { user } = useAuth();
  const router = useRouter();

  const onAcceptPress = () => {
    toast
      .promise(
        myFetch(`/rest/v1/invites/${invite.id}/accept`, { method: "POST" }),
        {
          loading: "Akceptowanie zaproszenia...",
          success: <b>Zaproszenie zaakceptowano</b>,
          error: <b>Wystąpił błąd</b>,
        }
      )
      .then(() => {
        router.refresh();
      });
  };

  const onRejectPress = () => {
    toast
      .promise(
        myFetch(`/rest/v1/invites/${invite.id}/reject`, { method: "POST" }),
        {
          loading: "Odrzucanie zaproszenia...",
          success: <b>Zaproszenie odrzucono</b>,
          error: <b>Wystąpił błąd</b>,
        }
      )
      .then(() => {
        router.refresh();
      });
  };

  return (
    <div className={styles.card}>
      <Text>
        Witaj <Text bold>{user?.name}</Text> Zostań prelegentem w wydarzeniu{" "}
        <Text bold>{invite.event.title}</Text>!
      </Text>

      <div className={styles.mid}>
        <div className={styles.texts}>
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

      <div className={styles.buttons}>
        <Button primary className={styles.button} onClick={onAcceptPress}>
          Akceptuj
        </Button>
        <Button className={styles.button} onClick={onRejectPress}>
          Odrzuć
        </Button>
      </div>
    </div>
  );
};

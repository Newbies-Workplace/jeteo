"use client";
import React from "react";
import styles from "./SpeakerPicker.module.scss";
import GreyCircle from "@/assets/images/speaker-picker-circle-grey.svg";
import PrimaryCircle from "@/assets/images/speaker-picker-circle-primary.svg";
import Add from "@/assets/add.svg";
import Delete from "@/assets/delete.svg";
import Copy from "@/assets/copy.svg";
import Image from "next/image";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";
import { Avatar } from "@/components/atoms/avatar/Avatar";
import cs from "classnames";

interface SpeakerPickerProps {
  onAddInvite?: () => void;
  onDeleteInvite?: () => void;
  onDeleteSpeaker?: () => void;
  invites: { email: string; name: string; link: string }[];
  speakers: { name: string; avatar: string }[];
}

export const SpeakerPicker: React.FC<SpeakerPickerProps> = ({
  onAddInvite,
  onDeleteInvite,
  onDeleteSpeaker,
  invites,
  speakers,
}) => {
  async function copyTextToClipboard(text: string) {
    return await navigator.clipboard.writeText(text);
  }

  return (
    <div className={styles.container}>
      <div className={styles.record}>
        <Image src={GreyCircle} alt={"GreyCircle"} width={32} height={32} />

        <input
          className={styles.input}
          style={{ width: "40%" }}
          type="email"
          placeholder="Email"
        />
        <input
          className={styles.input}
          style={{ width: "60%" }}
          type="text"
          placeholder="Nazwa (widoczna publicznie)"
        />

        <Image
          className={styles.add}
          src={Add}
          alt={"add"}
          width={20}
          height={20}
          onClick={onAddInvite}
        />
      </div>

      {invites &&
        invites.map((invite, index) => {
          return (
            <div
              className={cs(styles.record, styles.items)}
              key={`invite-${index}`}
            >
              <Image
                src={PrimaryCircle}
                alt={"PrimaryCircle"}
                width={32}
                height={32}
              />
              <Text className={styles.text} variant={"bodyM"}>
                {invite.email}
              </Text>
              <Text className={styles.name} variant={"bodyM"}>
                {invite.name}
              </Text>
              <Button
                className={styles.button}
                primary
                size="small"
                icon={Copy}
                onClick={() => {
                  copyTextToClipboard(invite.link);
                }}
              >
                Skopiuj zaproszenie
              </Button>
              <Image
                className={styles.delete}
                src={Delete}
                alt={"Delete"}
                width={22}
                height={22}
                onClick={onDeleteInvite}
              />
            </div>
          );
        })}

      {speakers &&
        speakers.map((speaker, index) => (
          <div
            className={cs(styles.record, styles.items)}
            key={`speaker-${index}`}
          >
            <Avatar src={speaker.avatar} size={32} />
            <Text
              className={styles.text}
              style={{ textAlign: "start", width: "100%", marginLeft: -1 }}
              variant={"bodyM"}
            >
              {speaker.name}
            </Text>
            <Image
              className={styles.delete}
              src={Delete}
              alt={"Delete"}
              width={22}
              height={22}
              onClick={onDeleteSpeaker}
            />
          </div>
        ))}

      <Text variant={"bodyS"}>
        Maksymlanie 2 prelegentów. Linki z zaproszeniami będą aktywowane i
        wysłane mailem po zapisaniu prelekcji.
      </Text>
    </div>
  );
};

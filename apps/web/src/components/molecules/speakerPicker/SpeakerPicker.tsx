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
import { UserResponse } from "shared/.dist/model/user/response/user.response";

interface SpeakerPickerProps {
  onAddInvite?: (email: string, name: string) => void;
  onDeleteInvite?: (id: string) => void;
  onDeleteSpeaker?: () => void;
  invites: { id: string; email: string; name: string }[];
  speakers: UserResponse[];
}

const emailRegExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const SpeakerPicker: React.FC<SpeakerPickerProps> = ({
  onAddInvite,
  onDeleteInvite,
  onDeleteSpeaker,
  invites,
  speakers,
}) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  const validInputs = () => {
    //todo toast
    if (email.length === 0 || name.length === 0) {
      console.log("puste pola");
      return;
    }

    if (!emailRegExp.test(email)) {
      console.log("email jest niepoprawny");
      return;
    }

    if (
      invites.some((invite) => invite.email === email) ||
      speakers.some((speaker) => speaker.socials.mail === email)
    ) {
      console.log("Osoba o tym Emailu jest juz zaproszona");

      return;
    }

    if (invites.length + speakers.length === 2) {
      console.log("liczba prelegentów nie może być większa niż 2");

      return;
    }

    onAddInvite(email, name);
  };

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
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          style={{ width: "60%" }}
          type="text"
          placeholder="Nazwa (widoczna publicznie)"
          onChange={(e) => setName(e.target.value)}
        />

        <Image
          className={styles.iconButton}
          src={Add}
          alt={"add"}
          width={20}
          height={20}
          onClick={validInputs}
        />
      </div>

      {invites &&
        invites.map((invite) => (
          <div className={cs(styles.record, styles.items)} key={invite.id}>
            <Image
              src={PrimaryCircle}
              alt={"PrimaryCircle"}
              width={32}
              height={32}
            />
            <Text className={styles.email} variant={"bodyM"}>
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
                copyTextToClipboard(
                  `http://127.0.0.1:3000/invite/${invite.id}` //todo sciezka z env
                );
              }}
            >
              Skopiuj zaproszenie
            </Button>
            <Image
              className={styles.iconButton}
              src={Delete}
              alt={"Delete"}
              width={22}
              height={22}
              onClick={() => onDeleteInvite(invite.id)}
            />
          </div>
        ))}

      {speakers &&
        speakers.map((speaker) => (
          <div className={cs(styles.record, styles.items)} key={speaker.id}>
            <Avatar src={speaker.avatar} size={32} />
            <Text
              className={styles.name}
              style={{ textAlign: "start", width: "100%", marginLeft: -3 }}
              variant={"bodyM"}
            >
              {speaker.name}
            </Text>
            <Image
              className={styles.iconButton}
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

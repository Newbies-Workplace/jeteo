"use client";

import React, { useState } from "react";
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
import { UserResponse } from "shared/model/user/response/user.response";
import { CreateLectureInvite } from "shared/model/lecture/request/createLecture.request";
import cs from "classnames";
import * as process from "process";

interface SpeakerPickerProps {
  onAddInvite?: (email: string, name: string) => void;
  onDeleteInvite?: (id: string) => void;
  onDeleteSpeaker?: (id: string) => void;
  invites: CreateLectureInvite[];
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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const canAdd = invites.length + speakers.length !== 2;

  const onSubmit = () => {
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    //todo toast
    if (trimmedEmail.length === 0 || trimmedName.length === 0) {
      console.log("puste pola");
      return;
    }

    if (!emailRegExp.test(trimmedEmail)) {
      console.log("email jest niepoprawny");
      return;
    }

    if (invites.some((invite) => invite.email === trimmedEmail)) {
      console.log("Osoba o tym Emailu jest juz zaproszona");

      return;
    }

    if (invites.length + speakers.length === 2) {
      console.log("liczba prelegentów nie może być większa niż 2");

      return;
    }

    onAddInvite(trimmedEmail, trimmedName);

    setEmail("");
    setName("");
  };

  async function copyTextToClipboard(text: string) {
    return await navigator.clipboard.writeText(text);
  }

  return (
    <div className={styles.container}>
      <table>
        <tbody>
          <tr>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={GreyCircle}
                  alt={"GreyCircle"}
                  width={32}
                  height={32}
                />
              </div>
            </td>

            <td>
              <input
                className={cs(styles.input, styles.ellipsis)}
                type="email"
                placeholder="Email"
                disabled={!canAdd}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>

            <td>
              <input
                className={cs(styles.input, styles.ellipsis)}
                type="text"
                placeholder="Nazwa (widoczna publicznie)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSubmit();
                  }
                }}
                disabled={!canAdd}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td />

            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
                {canAdd && (
                  <Image
                    className={styles.iconButton}
                    src={Add}
                    alt={"add"}
                    width={24}
                    height={24}
                    onClick={onSubmit}
                  />
                )}
              </div>
            </td>
          </tr>

          {invites &&
            invites.map((invite) => (
              <tr className={styles.item} key={invite.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={PrimaryCircle}
                      alt={"PrimaryCircle"}
                      width={32}
                      height={32}
                    />
                  </div>
                </td>
                <td className={styles.ellipsis}>
                  <Text variant={"bodyM"}>{invite.email}</Text>
                </td>
                <td className={styles.ellipsis}>
                  <Text variant={"bodyM"}>{invite.name}</Text>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                      style={{ minWidth: "unset" }}
                      primary
                      size="small"
                      rightIcon={Copy}
                      onClick={() => {
                        copyTextToClipboard(
                          `${process.env["NEXT_PUBLIC_FRONTEND_URL"]}/invite/${invite.id}`
                        );
                      }}
                    ></Button>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Image
                      className={styles.iconButton}
                      src={Delete}
                      alt={"Delete"}
                      width={24}
                      height={24}
                      onClick={() => onDeleteInvite(invite.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}

          {speakers &&
            speakers.map((speaker) => (
              <tr className={styles.item} key={speaker.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={speaker.avatar} size={32} />
                  </div>
                </td>
                <td className={styles.ellipsis} colSpan={2}>
                  <Text variant={"bodyM"}>{speaker.name}</Text>
                </td>
                <td />

                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Image
                      className={styles.iconButton}
                      src={Delete}
                      alt={"Delete"}
                      width={24}
                      height={24}
                      onClick={() => onDeleteSpeaker(speaker.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Text variant={"bodyS"}>
        Maksymlanie 2 prelegentów. Linki z zaproszeniami będą aktywowane i
        wysłane mailem po zapisaniu prelekcji.
      </Text>
    </div>
  );
};

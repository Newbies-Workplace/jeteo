"use client";

import React, { useState } from "react";
import GreyCircle from "@/assets/images/speaker-picker-circle-grey.svg";
import PrimaryCircle from "@/assets/images/speaker-picker-circle-primary.svg";
import AddSlim from "@/assets/AddSlim.svg";
import Delete from "@/assets/delete.svg";
import Image from "next/image";
import { Text } from "@/components/atoms/text/Text";
import { Avatar } from "@/components/atoms/avatar/Avatar";
import { UserResponse } from "shared/model/user/response/user.response";
import { CreateLectureInvite } from "shared/model/lecture/request/createLecture.request";
import { Validations } from "@/common/validations";
import { IconButton } from "@/components/atoms/iconButton/IconButton";
import { cn } from "@/lib/utils";

interface SpeakerPickerProps {
  onAddInvite?: (mail: string, name: string) => void;
  onDeleteInvite?: (id: string) => void;
  onDeleteSpeaker?: (id: string) => void;
  invites: CreateLectureInvite[];
  speakers: UserResponse[];
}

export const SpeakerPicker: React.FC<SpeakerPickerProps> = ({
  onAddInvite,
  onDeleteInvite,
  onDeleteSpeaker,
  invites,
  speakers,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const canAdd = invites.length + speakers.length !== 2;

  const onSubmit = () => {
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    if (trimmedEmail.length === 0 || trimmedName.length === 0) {
      setErrorMessage("Wszystkie pola muszą być uzupełnione.");
      return;
    }

    if (!Validations.email.value.test(trimmedEmail)) {
      setErrorMessage("Błędny adres email.");
      return;
    }

    if (invites.some((invite) => invite.mail === trimmedEmail)) {
      setErrorMessage("Osoba o tym mailu jest już zaproszona.");

      return;
    }

    if (invites.length + speakers.length === 2) {
      setErrorMessage("Liczba prelegentów nie może być większa niż: 2.");

      return;
    }

    onAddInvite?.(trimmedEmail, trimmedName);

    setEmail("");
    setName("");
  };

  return (
    <div className={cn("flex flex-col gap-2")}>
      <div
        className={
          "flex flex-row items-center gap-2 p-1 border border-stroke rounded-lg bg-background"
        }
      >
        <Image
          className={"size-8"}
          src={GreyCircle}
          alt={"GreyCircle"}
          width={32}
          height={32}
        />
        <div className={"grid grid-cols-2 gap-2 w-full"}>
          <input
            className={cn("bg-background whitespace-nowrap text-ellipsis")}
            type="email"
            placeholder="Email"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
            disabled={!canAdd}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage("");
            }}
          />
          <input
            className={cn("bg-background whitespace-nowrap text-ellipsis")}
            type="text"
            placeholder="Nazwa (widoczna publicznie)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
            disabled={!canAdd}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMessage("");
            }}
          />
        </div>
        {canAdd && (
          <IconButton
            icon={AddSlim}
            primary
            onClick={onSubmit}
            className={"ms-auto"}
          />
        )}
      </div>

      {invites &&
        invites.map((invite) => (
          <div
            key={invite.id}
            className={
              "flex flex-row items-center gap-2 p-1 w-full border border-stroke rounded-lg"
            }
          >
            <Image
              className={"size-8"}
              src={PrimaryCircle}
              alt={"PrimaryCircle"}
              width={32}
              height={32}
            />
            <div className={"grid grid-cols-2 gap-2 w-full"}>
              <Text
                variant={"bodyM"}
                className={
                  "bg-blue-500 whitespace-nowrap text-ellipsis overflow-hidden"
                }
              >
                {invite.mail}
              </Text>
              <Text
                variant={"bodyM"}
                className={
                  "bg-green-500 whitespace-nowrap text-ellipsis overflow-hidden"
                }
              >
                {invite.name}
              </Text>
            </div>

            <div className={"ms-auto"}>
              <IconButton
                icon={Delete}
                onClick={() => onDeleteInvite?.(invite.id)}
              />
            </div>
          </div>
        ))}

      {speakers &&
        speakers.map((speaker) => (
          <div
            key={speaker.id}
            className={
              "flex flex-row items-center gap-2 p-1 border border-stroke rounded-lg"
            }
          >
            <Avatar className={"size-8"} src={speaker.avatar} size={32} />
            <Text
              variant={"bodyM"}
              className={"whitespace-nowrap text-ellipsis"}
            >
              {speaker.name}
            </Text>

            <div className={"ms-auto"}>
              <IconButton
                icon={Delete}
                onClick={() => onDeleteSpeaker?.(speaker.id)}
              />
            </div>
          </div>
        ))}

      {errorMessage && (
        <Text variant={"bodyS"} className={"text-live"}>
          {errorMessage}
        </Text>
      )}

      <Text variant={"bodyS"}>
        Maksymlanie 2 prelegentów. Pamiętaj aby wysłać zaproszenie na adres,
        którym prelegent jest zalogowany w serwisie.
      </Text>
    </div>
  );
};

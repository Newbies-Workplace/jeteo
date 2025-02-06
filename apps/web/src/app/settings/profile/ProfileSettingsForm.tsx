"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCropDialog } from "@/contexts/useCropDialog";
import toast from "react-hot-toast";
import { myFetch } from "@/common/fetch";
import { UpdateUserRequest } from "shared/model/user/request/updateUser.request";
import { Section } from "@/components/molecules/section/Section";
import { FileUpload } from "@/components/molecules/fileUpload/FileUpload";
import { FileItem } from "@/components/molecules/fileItem/FileItem";
import { ControlledInput } from "@/components/atoms/input/ControlledInput";
import Button from "@/components/atoms/button/Button";
import { UserResponse } from "shared/model/user/response/user.response";

type ProfileForm = {
  name: string;
  jobTitle: string;
  description: string;
  socials: {
    mail: string;
    linkedin: string;
    twitter: string;
    github: string;
  };
};

export const ProfileSettingsForm: React.FC<{ user: UserResponse }> = ({
  user,
}) => {
  const { control, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      name: user.name,
      jobTitle: user.jobTitle,
      description: user.description,
      socials: {
        mail: user.socials.mail,
        linkedin: user.socials.linkedin,
        twitter: user.socials.twitter,
        github: user.socials.github,
      },
    },
  });
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user.avatar);

  const { CropDialog, openCropDialog } = useCropDialog({
    aspectRatio: 1,
    title: "Wykadruj zdjęcie",
    confirmText: "Gotowe",
    dismissText: "Anuluj",
    confirmAction: (file) => {
      saveAvatar(file);
    },
    dismissAction: () => {},
  });

  const onSubmit: SubmitHandler<ProfileForm> = (data: ProfileForm) => {
    toast.promise(
      myFetch(`/rest/v1/users/@me`, {
        method: "PUT",
        body: JSON.stringify(getUpdateUserRequestData(data)),
      }),
      {
        loading: "Zapisywanie...",
        success: <b>Profil zapisano pomyślnie!</b>,
        error: <b>Wystąpił błąd</b>,
      }
    );
  };

  const getUpdateUserRequestData = (form: ProfileForm): UpdateUserRequest => {
    return {
      // @ts-ignore
      avatar: undefined,
      name: form.name,
      jobTitle: form.jobTitle,
      description: form.description,
      socials: {
        mail: form.socials.mail,
        linkedin: form.socials.linkedin,
        twitter: form.socials.twitter,
        github: form.socials.github,
      },
    };
  };

  const saveAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    await myFetch(`/rest/v1/users/@me/avatar`, {
      method: "PUT",
      body: formData,
      headers: undefined,
    }).then((res) => {
      res.ok && res.text().then(setAvatarUrl);
    });
  };

  const deleteAvatar = async () => {
    await myFetch(`/rest/v1/users/@me/avatar`, {
      method: "DELETE",
    }).then((res) => {
      // @ts-ignore
      res.ok && setAvatarUrl(null);
    });
  };

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <CropDialog />
      <div
        className={
          "flex max-w-screen-lg flex-col items-start gap-3 flex-1 self-stretch p-6 rounded-t-2xl bg-surface shadow"
        }
      >
        <Section title="Zdjęcie profilowe">
          <div className={"flex flex-row gap-3"}>
            <FileUpload
              onChange={(files) => {
                openCropDialog(URL.createObjectURL(files[0]));
              }}
            />
            {avatarUrl && (
              <FileItem url={avatarUrl} onDeleteClick={deleteAvatar} />
            )}
          </div>
        </Section>
        <Section title="Dane podstawowe">
          <ControlledInput
            control={control}
            name="name"
            label="Nick"
            required
          />
          <ControlledInput
            control={control}
            name="jobTitle"
            label="Tytuł zawodowy"
          />

          <ControlledInput
            label="Opis profilu"
            control={control}
            name="description"
            multiline
          />
        </Section>
        <Section title="Dane kontaktowe (widoczne publicznie)">
          <ControlledInput
            control={control}
            name="socials.mail"
            label="Poczta"
          />
          <ControlledInput
            control={control}
            name="socials.linkedin"
            label="LinkedIn"
          />
          <ControlledInput
            control={control}
            name="socials.twitter"
            label="Twitter"
          />
          <ControlledInput
            control={control}
            name="socials.github"
            label="GitHub"
          />
        </Section>
        <Button
          primary
          style={{ alignSelf: "flex-end" }}
          onClick={handleSubmit(onSubmit)}
        >
          Zapisz
        </Button>
      </div>
    </form>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Section } from "@/components/molecules/section/Section";
import { FileUpload } from "@/components/molecules/fileUpload/FileUpload";
import { ControlledInput } from "@/components/atoms/input/ControlledInput";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/atoms/button/Button";
import { useAuth } from "@/contexts/Auth.hook";
import { UpdateUserRequest } from "shared/model/user/request/updateUser.request";
import { myFetch } from "@/common/fetch";
import { FileItem } from "@/components/molecules/fileItem/FileItem";
import toast from "react-hot-toast";
import { Portal } from "@/components/molecules/portal/Portal";
import { CropImageDialog } from "@/components/molecules/cropImageDialog/CropImageDialog";

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

export default function Page() {
  const { user } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const { control, handleSubmit, reset } = useForm<ProfileForm>();
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatar);
  const [imageSrc, setImageSrc] = useState<File>();

  useEffect(() => {
    if (!user || isInitialized) return;

    setIsInitialized(true);

    setAvatarUrl(user.avatar);
    reset({
      name: user.name,
      jobTitle: user.jobTitle,
      description: user.description,
      socials: {
        mail: user.socials.mail,
        linkedin: user.socials.linkedin,
        twitter: user.socials.twitter,
        github: user.socials.github,
      },
    });
  }, [user, isInitialized]);

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
      res.ok && setAvatarUrl(null);
    });
  };

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <div className={styles.container}>
        <Section title="Zdjęcie profilowe">
          <div className={styles.imageInputs}>
            {imageSrc && (
              <Portal>
                <CropImageDialog
                  title="Wykadruj zdjęcie"
                  confirmText="Gotowe"
                  dismissText="Anuluj"
                  confirmAction={(blob) => {
                    const file = new File([blob], "a", { type: blob.type });
                    saveAvatar(file);
                    setImageSrc(null);
                  }}
                  dismissAction={() => {
                    setImageSrc(null);
                  }}
                  imgSrc={URL.createObjectURL(imageSrc)}
                  aspectRatio={1}
                />
              </Portal>
            )}
            <FileUpload
              onChange={(files) => {
                setImageSrc(files[0]);
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
}

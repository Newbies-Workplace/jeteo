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

type ProfileForm = {
  name: string;
  jobTitle: string;
  description: string;
  socials: {
    mail: string;
    linkedIn: string;
    twitter: string;
    github: string;
  };
};

export default function Page() {
  const { user } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const { control, handleSubmit, reset } = useForm<ProfileForm>();
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatar);

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
        linkedIn: user.socials.linkedIn,
        twitter: user.socials.twitter,
        github: user.socials.github,
      },
    });
  }, [user, isInitialized]);

  const onSubmit: SubmitHandler<ProfileForm> = (data: ProfileForm) => {
    console.log(data);
    myFetch(`/rest/v1/users/@me`, {
      method: "PUT",
      body: JSON.stringify(getUpdateUserRequestData(data)),
    }).then((res) => res.json());
  };

  const getUpdateUserRequestData = (form: ProfileForm): UpdateUserRequest => {
    return {
      avatar: undefined,
      name: form.name,
      jobTitle: form.jobTitle,
      description: form.description,
      socials: {
        mail: form.socials.mail,
        linkedIn: form.socials.linkedIn,
        twitter: form.socials.twitter,
        github: form.socials.github,
      },
    };
  };

  const saveAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await myFetch(`/rest/v1/users/@me/avatar`, {
      method: "PUT",
      body: formData,
      headers: undefined,
    });
    res.text().then((avatarUrl) => {
      setAvatarUrl(avatarUrl);
    });
  };

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <div className={styles.container}>
        <Section title="Zdjęcie profilowe">
          <div className={styles.imageInputs}>
            <FileUpload
              onChange={(files) => {
                saveAvatar(files[0]);
              }}
            />
            <FileItem url={avatarUrl} />
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
            name="socials.linkedIn"
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

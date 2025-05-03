"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCropDialog } from "@/contexts/useCropDialog";
import toast from "react-hot-toast";
import { Section } from "@/components/molecules/section/Section";
import { FileUpload } from "@/components/molecules/fileUpload/FileUpload";
import { FileItem } from "@/components/molecules/fileItem/FileItem";
import { ControlledInput } from "@/components/atoms/input/ControlledInput";
import Button from "@/components/atoms/button/Button";
import {
  deleteMyUserImage,
  updateMyUser,
  updateMyUserImage,
} from "@/lib/actions/users";
import { userUpdateSchema, UserUpdateSchema } from "@/lib/actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { notBlankOrNull } from "@/lib/utils";

export const ProfileSettingsForm: React.FC = ({}) => {
  const { update, data } = useSession();
  const user = data?.user!;
  const { control, handleSubmit } = useForm<UserUpdateSchema>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user.name,
      jobTitle: user.jobTitle,
      description: user.description,
      socials: {
        mail: notBlankOrNull(user.socials.mail),
        linkedin: notBlankOrNull(user.socials.linkedin),
        twitter: notBlankOrNull(user.socials.twitter),
        github: notBlankOrNull(user.socials.github),
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
      const form = new FormData();
      form.append("image", file);

      updateMyUserImage(form).then((res) => {
        setAvatarUrl(res.image);
        update();
      });
    },
    dismissAction: () => {},
  });

  const onSubmit: SubmitHandler<UserUpdateSchema> = (
    form: UserUpdateSchema
  ) => {
    toast.promise(
      updateMyUser({
        // @ts-ignore
        image: undefined,
        name: form.name,
        jobTitle: notBlankOrNull(form.jobTitle),
        description: notBlankOrNull(form.description),
        socials: {
          mail: notBlankOrNull(form.socials?.mail),
          linkedin: notBlankOrNull(form.socials?.linkedin),
          twitter: notBlankOrNull(form.socials?.twitter),
          github: notBlankOrNull(form.socials?.github),
        },
      }).then(() => {
        update();
      }),
      {
        loading: "Zapisywanie...",
        success: <b>Profil zapisano pomyślnie!</b>,
        error: <b>Wystąpił błąd</b>,
      }
    );
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
              <FileItem
                url={avatarUrl}
                onDeleteClick={async () => {
                  await deleteMyUserImage();

                  setAvatarUrl(undefined);
                  update();
                }}
              />
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

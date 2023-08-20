"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Section } from "@/components/molecules/section/Section";
import { ControlledInput } from "@/components/atoms/input/ControlledInput";
import { Validations } from "@/common/validations";
import { ControlledMarkdownInput } from "@/components/atoms/markdownInput/ControlledMarkdownInput";
import dayjs from "dayjs";
import { SpeakerPicker } from "@/components/molecules/speakerPicker/SpeakerPicker";
import Button from "@/components/atoms/button/Button";
import { UserResponse } from "shared/model/user/response/user.response";
import { v4 as uuidv4 } from "uuid";

type BasicForm = {
  title: string;
  description: string;
  from: string;
  to: string;
  invites: { id: string; email: string; name: string }[];
  speakers: UserResponse[];
};

const getDefaultValue = (): BasicForm => {
  return {
    title: "",
    description: "",
    from: dayjs().format("YYYY-MM-DDThh:mm"),
    to: dayjs().add(1, "h").format("YYYY-MM-DDThh:mm"),
    invites: [],
    speakers: [],
  };
};

interface LectureBasicFormProps {
  onSubmitted?: () => void;
}

export const LectureBasicForm: React.FC<LectureBasicFormProps> = ({
  onSubmitted,
}) => {
  const { control } = useForm<BasicForm>({
    defaultValues: getDefaultValue(),
  });

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <Section title={"Co i kiedy?"}>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <ControlledInput
            name={"from"}
            label={"Rozpoczęcie"}
            control={control}
            type={"datetime-local"}
            rules={{ required: Validations.required }}
          />
          <ControlledInput
            name={"to"}
            label={"Zakończenie"}
            control={control}
            type={"datetime-local"}
            rules={{ required: Validations.required }}
          />
        </div>

        <ControlledInput
          name={"title"}
          label={"Tytuł"}
          required
          control={control}
          rules={{
            required: Validations.required,
            minLength: Validations.minLength(5),
            maxLength: Validations.maxLength(100),
          }}
        />

        <ControlledMarkdownInput
          name={"description"}
          label={"Opis"}
          required
          height={200}
          textareaProps={{ maxLength: 10000 }}
          control={control}
          rules={{
            required: Validations.required,
            minLength: Validations.minLength(10),
          }}
        />
      </Section>
      <Section title={"Prelegenci"}>
        <Controller
          name={"invites"}
          control={control}
          render={({ field }) => (
            <SpeakerPicker
              invites={field.value}
              speakers={[]}
              onAddInvite={(email, name) => {
                //todo add toast

                if (field.value.some((invite) => invite.email === email)) {
                  return;
                }

                field.onChange([...field.value, { id: uuidv4(), email, name }]);
              }}
              onDeleteInvite={(id) => {
                field.onChange(
                  field.value.filter((invite) => invite.id !== id)
                );
              }}
              onDeleteSpeaker={() => {}}
            />
          )}
        />
      </Section>
      <Button
        primary
        style={{ alignSelf: "flex-end" }}
        onClick={() => console.log("SAVE")}
      >
        Zapisz
      </Button>
    </form>
  );
};

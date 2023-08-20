"use client";

import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Section } from "@/components/molecules/section/Section";
import { ControlledInput } from "@/components/atoms/input/ControlledInput";
import { Validations } from "@/common/validations";
import { ControlledMarkdownInput } from "@/components/atoms/markdownInput/ControlledMarkdownInput";
import dayjs from "dayjs";
import { SpeakerPicker } from "@/components/molecules/speakerPicker/SpeakerPicker";
import Button from "@/components/atoms/button/Button";
import { UserResponse } from "shared/model/user/response/user.response";
import { v4 as uuidv4 } from "uuid";
import { myFetch } from "@/common/fetch";
import {
  CreateLectureInvite,
  CreateLectureRequest,
} from "shared/model/lecture/request/createLecture.request";
import { StudioLectureResponse } from "shared/model/lecture/response/lecture.response";

type BasicForm = {
  title: string;
  description: string;
  from: string;
  to: string;
  speakersAndInvites: {
    invites: CreateLectureInvite[];
    speakers: UserResponse[];
  };
};

const getDefaultValue = (): BasicForm => {
  return {
    title: "",
    description: "",
    from: dayjs().format("YYYY-MM-DDThh:mm"),
    to: dayjs().add(1, "h").format("YYYY-MM-DDThh:mm"),
    speakersAndInvites: {
      invites: [],
      speakers: [],
    },
  };
};

const getCreateRequestData = (form: BasicForm): CreateLectureRequest => {
  return {
    title: form.title,
    description: form.description,
    from: form.from,
    to: form.to,
    invites: form.speakersAndInvites.invites,
  };
};

interface LectureBasicFormProps {
  eventSlug: string;
  onSubmitted?: (res: StudioLectureResponse) => void;
}

export const LectureBasicForm: React.FC<LectureBasicFormProps> = ({
  eventSlug,
  onSubmitted,
}) => {
  const { control, handleSubmit } = useForm<BasicForm>({
    defaultValues: getDefaultValue(),
  });

  const onSubmit: SubmitHandler<BasicForm> = (data: BasicForm) => {
    myFetch(`/rest/v1/events/${eventSlug}/lectures`, {
      method: "POST",
      body: JSON.stringify(getCreateRequestData(data)),
    })
      .then((res) => res.json())
      .then((res) => {
        onSubmitted?.(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
          name={"speakersAndInvites"}
          control={control}
          render={({ field }) => (
            <SpeakerPicker
              invites={field.value.invites}
              speakers={field.value.speakers}
              onAddInvite={(email, name) => {
                //todo add toast

                if (
                  field.value.invites.some((invite) => invite.email === email)
                ) {
                  return;
                }

                field.onChange({
                  ...field.value,
                  invites: [
                    ...field.value.invites,
                    {
                      id: uuidv4(),
                      email,
                      name,
                    },
                  ],
                });
              }}
              onDeleteInvite={(id) => {
                field.onChange({
                  ...field.value,
                  invites: field.value.invites.filter(
                    (invite) => invite.id !== id
                  ),
                });
              }}
              onDeleteSpeaker={() => {
                //todo
              }}
            />
          )}
        />
      </Section>
      <Button
        primary
        style={{ alignSelf: "flex-end" }}
        onClick={handleSubmit(onSubmit)}
      >
        Zapisz
      </Button>
    </form>
  );
};

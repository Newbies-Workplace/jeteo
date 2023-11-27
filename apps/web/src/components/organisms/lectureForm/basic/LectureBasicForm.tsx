"use client";

import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Section } from "@/components/molecules/section/Section";
import { ControlledInput } from "@/components/atoms/input/ControlledInput";
import { Validations } from "@/common/validations";
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
import {
  LectureResponse,
  LectureDetailsResponse,
} from "shared/model/lecture/response/lecture.response";
import { UpdateLectureRequest } from "shared/model/lecture/request/updateLecture.request";
import { getIdFromSlug } from "shared/util";
import toast from "react-hot-toast";

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

const getDefaultValue = (lecture?: LectureDetailsResponse): BasicForm => {
  return lecture
    ? {
        title: lecture.title,
        description: lecture.description,
        from: dayjs(lecture.from).format("YYYY-MM-DDTHH:mm"),
        to: dayjs(lecture.to).format("YYYY-MM-DDTHH:mm"),
        speakersAndInvites: {
          invites: lecture.invites,
          speakers: lecture.speakers,
        },
      }
    : {
        title: "",
        description: "",
        from: dayjs().format("YYYY-MM-DDTHH:mm"),
        to: dayjs().add(1, "h").format("YYYY-MM-DDTHH:mm"),
        speakersAndInvites: {
          invites: [],
          speakers: [],
        },
      };
};

const getRequest = async (
  data: BasicForm,
  eventSlug: string,
  lecture?: LectureResponse
): Promise<LectureResponse> => {
  if (lecture) {
    return myFetch(`/rest/v1/lectures/${lecture.id}`, {
      method: "PATCH",
      body: JSON.stringify(getUpdateRequestData(data)),
    }).then((res) => res.json());
  } else {
    return myFetch(`/rest/v1/events/${getIdFromSlug(eventSlug)}/lectures`, {
      method: "POST",
      body: JSON.stringify(getCreateRequestData(data)),
    }).then((res) => res.json());
  }
};

const getCreateRequestData = (form: BasicForm): CreateLectureRequest => {
  return {
    title: form.title,
    description: form.description,
    from: dayjs(form.from).toISOString(),
    to: dayjs(form.to).toISOString(),
    invites: form.speakersAndInvites.invites,
  };
};
const getUpdateRequestData = (form: BasicForm): UpdateLectureRequest => {
  return {
    title: form.title,
    description: form.description,
    from: dayjs(form.from).toISOString(),
    to: dayjs(form.to).toISOString(),
    invites: form.speakersAndInvites.invites,
    speakerIds: form.speakersAndInvites.speakers.map((speaker) => speaker.id),
  };
};

interface LectureBasicFormProps {
  eventSlug: string;
  lecture?: LectureDetailsResponse;
  onSubmitted?: (res: LectureResponse) => void;
}

export const LectureBasicForm: React.FC<LectureBasicFormProps> = ({
  eventSlug,
  lecture,
  onSubmitted,
}) => {
  const { control, handleSubmit } = useForm<BasicForm>({
    defaultValues: getDefaultValue(lecture),
  });

  const onSubmit: SubmitHandler<BasicForm> = (data: BasicForm) => {
    toast.promise(
      getRequest(data, eventSlug, lecture).then(
        (res: LectureDetailsResponse) => {
          onSubmitted?.(res);
        }
      ),
      {
        loading: "Zapisywanie...",
        success: <b>Wydarzenie zapisano pomyślnie!</b>,
        error: <b>Wystąpił błąd</b>,
      }
    );
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

        <ControlledInput
          name={"description"}
          label={"Opis"}
          required
          multiline
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
                field.onChange({
                  ...field.value,
                  invites: [
                    ...field.value.invites,
                    {
                      id: uuidv4(),
                      mail: email,
                      name: name,
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
              onDeleteSpeaker={(id) => {
                field.onChange({
                  ...field.value,
                  speakers: field.value.speakers.filter(
                    (speaker) => speaker.id !== id
                  ),
                });
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

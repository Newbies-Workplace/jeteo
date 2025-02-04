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
  LectureDetailsResponse,
  LectureResponse,
} from "shared/model/lecture/response/lecture.response";
import { UpdateLectureRequest } from "shared/model/lecture/request/updateLecture.request";
import { getIdFromSlug } from "shared/util";
import toast from "react-hot-toast";
import YouTube from "react-youtube";

type BasicForm = {
  title: string;
  description: string;
  from: string;
  to: string;
  youtubeLink?: string;
  speakersAndInvites: {
    invites: CreateLectureInvite[];
    speakers: UserResponse[];
  };
};

const getDefaultValue = (lecture?: LectureDetailsResponse): BasicForm => {
  // @ts-ignore
  return lecture
    ? {
        title: lecture.title,
        description: lecture.description,
        from: dayjs(lecture.from).format("YYYY-MM-DDTHH:mm"),
        to: dayjs(lecture.to).format("YYYY-MM-DDTHH:mm"),
        youtubeLink: lecture.youtubeVideoId
          ? "https://www.youtube.com/watch?v=" + lecture.youtubeVideoId
          : null,
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
        youtubeLink: "",
        speakersAndInvites: {
          invites: [],
          speakers: [],
        },
      };
};

const youtubeVideoIdFromUrl = (url: string | undefined): string | undefined => {
  if (!url) {
    return undefined;
  }

  const match = url.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  );

  return match && match[2].length === 11 ? match[2] : undefined;
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
    youtubeVideoId: youtubeVideoIdFromUrl(form.youtubeLink),
    invites: form.speakersAndInvites.invites,
  };
};
const getUpdateRequestData = (form: BasicForm): UpdateLectureRequest => {
  return {
    title: form.title,
    description: form.description,
    from: dayjs(form.from).toISOString(),
    to: dayjs(form.to).toISOString(),
    youtubeVideoId: youtubeVideoIdFromUrl(form.youtubeLink),
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
  const { control, handleSubmit, watch } = useForm<BasicForm>({
    defaultValues: getDefaultValue(lecture),
  });

  const onSubmit: SubmitHandler<BasicForm> = (data: BasicForm) => {
    toast.promise(
      getRequest(data, eventSlug, lecture).then(
        // @ts-ignore
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
            rules={{
              required: Validations.required,
              validate: (value) => Validations.dateRange(value, watch("to")),
            }}
          />
          <ControlledInput
            name={"to"}
            label={"Zakończenie"}
            control={control}
            type={"datetime-local"}
            rules={{
              required: Validations.required,
              validate: (value) => Validations.dateRange(watch("from"), value),
            }}
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
      <Section title={"Wideo"}>
        <ControlledInput
          name={"youtubeLink"}
          label={"Link do filmu na YouTube"}
          control={control}
          rules={{
            pattern: Validations.youtubeVideoLink,
          }}
        />

        {youtubeVideoIdFromUrl(watch("youtubeLink")) && (
          <YouTube videoId={youtubeVideoIdFromUrl(watch("youtubeLink"))} />
        )}
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

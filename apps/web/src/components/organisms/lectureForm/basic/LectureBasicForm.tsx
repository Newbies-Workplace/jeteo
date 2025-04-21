"use client";

import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Section } from "@/components/molecules/section/Section";
import { ControlledInput } from "@/components/atoms/input/ControlledInput";
import dayjs from "dayjs";
import { SpeakerPicker } from "@/components/molecules/speakerPicker/SpeakerPicker";
import Button from "@/components/atoms/button/Button";
import { v4 as uuidv4 } from "uuid";
import {
  LectureDetailsResponse,
  LectureResponse,
} from "shared/model/lecture/response/lecture.response";
import { getIdFromSlug } from "shared/util";
import toast from "react-hot-toast";
import YouTube from "react-youtube";
import { createLecture, updateLecture } from "@/lib/actions/lectures";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LectureCreateSchema,
  lectureCreateSchema,
  LectureUpdateSchema,
  lectureUpdateSchema,
} from "@/lib/actions/schemas";
import { youtubeVideoIdFromUrl } from "@/lib/actions/converters";

const getDefaultValue = (
  lecture?: LectureDetailsResponse
): LectureCreateSchema | LectureUpdateSchema => {
  // @ts-ignore
  return lecture
    ? {
        title: lecture.title,
        description: lecture.description,
        from: dayjs(lecture.from).format("YYYY-MM-DDTHH:mm"),
        to: dayjs(lecture.to).format("YYYY-MM-DDTHH:mm"),
        youtubeVideoId: lecture.youtubeVideoId
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
        youtubeVideoId: "",
        speakersAndInvites: {
          invites: [],
          speakers: [],
        },
      };
};

const getRequest = async (
  data: LectureCreateSchema | LectureUpdateSchema,
  eventSlug: string,
  lecture?: LectureResponse
): Promise<LectureResponse> => {
  if (lecture) {
    return updateLecture(lecture.id, getUpdateRequestData(data));
  } else {
    return createLecture(getIdFromSlug(eventSlug), getCreateRequestData(data));
  }
};

const getCreateRequestData = (
  form: LectureCreateSchema
): LectureCreateSchema => {
  return {
    title: form.title,
    description: form.description,
    from: dayjs(form.from).toISOString(),
    to: dayjs(form.to).toISOString(),
    youtubeVideoId: form.youtubeVideoId,
    speakersAndInvites: {
      invites: form.speakersAndInvites.invites,
      speakers: [],
    },
  };
};
const getUpdateRequestData = (
  form: LectureUpdateSchema
): LectureUpdateSchema => {
  return {
    title: form.title,
    description: form.description,
    from: dayjs(form.from).toISOString(),
    to: dayjs(form.to).toISOString(),
    youtubeVideoId: form.youtubeVideoId,
    speakersAndInvites: {
      invites: form.speakersAndInvites?.invites ?? [],
      speakers: form.speakersAndInvites?.speakers ?? [],
    },
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
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LectureCreateSchema | LectureUpdateSchema>({
    resolver: zodResolver(lecture ? lectureUpdateSchema : lectureCreateSchema),
    defaultValues: getDefaultValue(lecture),
  });

  const onSubmit: SubmitHandler<
    LectureCreateSchema | LectureUpdateSchema
  > = async (data: LectureCreateSchema | LectureUpdateSchema) => {
    await toast.promise(
      getRequest(data, eventSlug, lecture).then(
        // @ts-ignore
        (res: LectureDetailsResponse) => {
          onSubmitted?.(res);
        }
      ),
      {
        loading: "Aktualizowanie prelekcji...",
        success: <b>Prelekcja zaktualizowana</b>,
        error: <b>Wystąpił błąd</b>,
      }
    );
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Section title={"Co i kiedy?"}>
        <div className={"flex gap-3 flex-row justify-around"}>
          <ControlledInput
            name={"from"}
            label={"Rozpoczęcie"}
            control={control}
            type={"datetime-local"}
          />
          <ControlledInput
            name={"to"}
            label={"Zakończenie"}
            control={control}
            type={"datetime-local"}
          />
        </div>

        <ControlledInput
          name={"title"}
          label={"Tytuł"}
          required
          control={control}
        />

        <ControlledInput
          name={"description"}
          label={"Opis"}
          required
          multiline
          control={control}
        />
      </Section>
      <Section title={"Prelegenci"}>
        <Controller
          name={"speakersAndInvites"}
          control={control}
          render={({ field }) => (
            <SpeakerPicker
              invites={field.value?.invites ?? []}
              speakers={
                lecture?.speakers.filter((speaker) =>
                  field.value?.speakers.includes(speaker.id)
                ) ?? []
              }
              onAddInvite={(email, name) => {
                field.onChange({
                  ...field.value,
                  invites: [
                    ...(field.value?.invites ?? []),
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
                  invites: field.value?.invites.filter(
                    (invite) => invite.id !== id
                  ),
                });
              }}
              onDeleteSpeaker={(id) => {
                field.onChange({
                  ...field.value,
                  speakers: field.value?.speakers.filter(
                    (speaker) => speaker !== id
                  ),
                });
              }}
            />
          )}
        />
      </Section>
      <Section title={"Wideo"}>
        <ControlledInput
          name={"youtubeVideoId"}
          label={"Link do filmu na YouTube"}
          control={control}
        />

        {youtubeVideoIdFromUrl(watch("youtubeVideoId")) && (
          <YouTube videoId={watch("youtubeVideoId")} />
        )}
      </Section>
      <Button primary className={"self-end"} type="submit">
        Zapisz
      </Button>
    </form>
  );
};

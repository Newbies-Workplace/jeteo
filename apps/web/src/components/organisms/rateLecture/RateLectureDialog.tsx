"use client";

import { SpeakerCard } from "@/components/molecules/speakerCard/SpeakerCard";
import { Text } from "@/components/atoms/text/Text";
import RateStars from "@/components/molecules/rateStars/RateStars";
import TextArea from "./textArea/TextArea";
import Button from "@/components/atoms/button/Button";
import React, { useState } from "react";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { myFetch } from "@/common/fetch";
import { Validations } from "@/common/validations";
import ConfettiExplosion from "react-confetti-explosion";
import toast from "react-hot-toast";

type RateForm = {
  overallRate: number;
  topicRate: number;
  opinion: string;
};

export interface RateLectureProps {
  lecture: LectureResponse;
  onDismiss: () => void;
}

export const RateLectureDialog: React.FC<RateLectureProps> = ({
  lecture,
  onDismiss,
}) => {
  const [confetti, setConfetti] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(true);

  const { control, handleSubmit, reset, watch } = useForm<RateForm>();

  const formValues = watch(["overallRate", "topicRate"]);

  const onSubmit: SubmitHandler<RateForm> = (data: RateForm) => {
    toast.promise(
      myFetch(`/rest/v1/lectures/${lecture.id}/rate`, {
        method: "POST",
        body: JSON.stringify({
          overallRate: data.overallRate,
          topicRate: data.topicRate,
          opinion: data.opinion ? data.opinion : undefined,
        }),
      }).then(() => {
        setConfetti(true);
        setIsDialogVisible(false);
      }),
      {
        loading: "Zapisywanie...",
        success: <b>Ocena wystawiona pomyślnie!</b>,
        error: <b>Wystąpił błąd</b>,
      }
    );
  };

  const handleDismiss = () => {
    onDismiss();
  };

  const handleConfettiCompleted = () => {
    setConfetti(false);
    reset();
    onDismiss();
    setIsDialogVisible(true);
  };

  return (
    <>
      {confetti && (
        <ConfettiExplosion
          className={"fixed top-1/2 left-1/2 w-full h-full"}
          zIndex={10001}
          onComplete={() => handleConfettiCompleted()}
        />
      )}

      {isDialogVisible && (
        <div
          className="fixed inset-0 z-[10000] bg-black/50 flex justify-center items-end sm:items-center"
          onClick={handleDismiss}
        >
          <form
            className="flex flex-col bg-white rounded-2xl p-6 gap-6 max-sm:rounded-b-none max-sm:w-full"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex flex-col gap-2">
              <Text variant="headS" bold>
                {lecture.title}
              </Text>
              <div className="flex flex-row gap-2">
                {[...lecture.speakers, ...lecture.invites].map((speaker) => (
                  <SpeakerCard key={speaker.name} {...speaker} />
                ))}
              </div>
              <div className="w-full h-[1px] bg-stroke" />
            </div>
            <Controller
              name={"overallRate"}
              control={control}
              rules={{ required: Validations.required }}
              render={({ field }) => (
                <RateStars
                  title={"Jak oceniasz prelekcję?"}
                  subtitle={"(prezentacja, feeling, całokształt)"}
                  rating={field.value}
                  setRating={(rate) => {
                    field.onChange(rate);
                  }}
                />
              )}
            />
            <Controller
              name={"topicRate"}
              control={control}
              rules={{ required: Validations.required }}
              render={({ field }) => (
                <RateStars
                  title={"Jak oceniasz temat?"}
                  subtitle={"(atrakcyjność tematu)"}
                  rating={field.value}
                  setRating={(rate) => {
                    field.onChange(rate);
                  }}
                />
              )}
            />
            <Controller
              name={"opinion"}
              control={control}
              render={({ field }) => (
                <TextArea
                  title={"Opinia dla prelegenta"}
                  text={field.value}
                  setText={(opinion) => {
                    field.onChange(opinion);
                  }}
                />
              )}
            />
            <div className="grid grid-cols-4 gap-6">
              <Button size="medium" onClick={handleDismiss}>
                <Text variant="bodyL">Anuluj</Text>
              </Button>
              <Button
                className={"col-span-3"}
                size="medium"
                primary
                disabled={
                  formValues.some((value) => value === undefined) || confetti
                }
                onClick={handleSubmit(onSubmit)}
              >
                <Text variant="bodyL">Oceń</Text>
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

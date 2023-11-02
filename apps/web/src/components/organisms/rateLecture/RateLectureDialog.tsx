"use client";

import styles from "./RateLectureDialog.module.scss";
import { SpeakerCard } from "@/components/molecules/speakerCard/SpeakerCard";
import { Text } from "@/components/atoms/text/Text";
import RateStars from "@/components/molecules/rateStars/RateStars";
import TextArea from "./textArea/TextArea";
import Button from "@/components/atoms/button/Button";
import colors from "@/colors.module.scss";
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
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
          }}
          zIndex={10001}
          onComplete={() => handleConfettiCompleted()}
        />
      )}

      {isDialogVisible && (
        <div className={styles.root} onClick={handleDismiss}>
          <form
            className={styles.rateLecture}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={styles.vertical}>
              <Text variant="headS" bold>
                {lecture.title}
              </Text>
              <div className={styles.horizontal}>
                {[...lecture.speakers, ...lecture.invites].map((speaker) => (
                  <SpeakerCard key={speaker.name} {...speaker} />
                ))}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "1.5px",
                  backgroundColor: colors.stroke,
                }}
              />
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
            <div className={styles.buttonsWrapper}>
              <Button size="medium" onClick={handleDismiss}>
                <Text variant="bodyL">Anuluj</Text>
              </Button>
              <Button
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

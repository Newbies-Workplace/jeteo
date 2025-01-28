"use client";

import React, { useState } from "react";
import { Text } from "@/components/atoms/text/Text";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";
import { Portal } from "@/components/molecules/portal/Portal";
import { RateLectureDialog } from "@/components/organisms/rateLecture/RateLectureDialog";
import {
  actionClassName,
  ActionsContainer,
} from "@/components/molecules/cardActions/ActionsContainer";
import { cn } from "@/lib/utils";

export const LectureCardActionsLive: React.FC<{ lecture: LectureResponse }> = ({
  lecture,
}) => {
  return (
    <ActionsContainer>
      <RateButton lecture={lecture} />
    </ActionsContainer>
  );
};

export const LectureCardActionsFresh: React.FC<{
  lecture: LectureResponse;
}> = ({ lecture }) => {
  return (
    <ActionsContainer>
      <RateButton lecture={lecture} />
      <LectureRating lecture={lecture} />
    </ActionsContainer>
  );
};

export const LectureCardActionsArchive: React.FC<{
  lecture: LectureResponse;
}> = ({ lecture }) => {
  return (
    <ActionsContainer>
      <LectureRating lecture={lecture} />
    </ActionsContainer>
  );
};

const RateButton: React.FC<{ lecture: LectureResponse }> = ({ lecture }) => {
  const [rateDialogVisible, setRateDialogVisible] = useState(false);
  return (
    <>
      {rateDialogVisible && (
        <Portal>
          <RateLectureDialog
            lecture={lecture}
            onDismiss={() => setRateDialogVisible(false)}
          />
        </Portal>
      )}
      <div
        className={cn(
          actionClassName,
          "cursor-pointer text-white bg-live hover:bg-liveHover"
        )}
        onClick={() => {
          setRateDialogVisible(true);
        }}
      >
        <Text variant="headS" bold>
          Oceń
        </Text>
      </div>
    </>
  );
};

const LectureRating: React.FC<{ lecture: LectureResponse }> = ({ lecture }) => {
  return (
    <Text
      className={cn(actionClassName, "text-white bg-[#080736] justify-between")}
      bold
    >
      <span>Średnia ocena</span>

      <span>{lecture.ratingSummary.average.toFixed(2)}</span>
    </Text>
  );
};

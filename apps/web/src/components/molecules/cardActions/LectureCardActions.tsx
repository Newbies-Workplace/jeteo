"use client";

import styles from "./CardActions.module.scss";
import { Text } from "@/components/atoms/text/Text";
import React, { useState } from "react";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";
import cs from "classnames";
import { Portal } from "@/components/molecules/portal/Portal";
import { RateLectureDialog } from "@/components/organisms/rateLecture/RateLectureDialog";

export const LectureCardActionsLive: React.FC<{ lecture: LectureResponse }> = ({
  lecture,
}) => {
  return (
    <div className={styles.actions}>
      <RateButton lecture={lecture} />
    </div>
  );
};

export const LectureCardActionsFresh: React.FC<{
  lecture: LectureResponse;
}> = ({ lecture }) => {
  return (
    <div className={styles.actions}>
      <RateButton lecture={lecture} />
      <LectureRating lecture={lecture} />
    </div>
  );
};

export const LectureCardActionsArchive: React.FC<{
  lecture: LectureResponse;
}> = ({ lecture }) => {
  return (
    <div className={styles.actions}>
      <LectureRating lecture={lecture} />
    </div>
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
        className={cs(styles.action, styles.liveAction)}
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
    <Text className={cs(styles.action, styles.rate, styles.stretched)} bold>
      <span className={styles.rateAverage}>Średnia ocena</span>

      <div className={styles.stars}>
        {lecture.ratingSummary.average.toFixed(2)}
      </div>
    </Text>
  );
};

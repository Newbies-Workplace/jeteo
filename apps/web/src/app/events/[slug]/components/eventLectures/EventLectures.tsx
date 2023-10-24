"use client";

import React, { useState } from "react";
import { LectureResponse } from "shared/.dist/model/lecture/response/lecture.response";
import styles from "./EventLectures.module.scss";
import { SmartLectureCard } from "@/components/molecules/lectureCard/LectureCard";
import { RateLectureDialog } from "@/components/organisms/rateLecture/RateLectureDialog";
import { Portal } from "@/components/molecules/portal/Portal";

export interface EventLecturesProps {
  lectures: LectureResponse[];
}

export const EventLectures: React.FC<EventLecturesProps> = ({ lectures }) => {
  const [ratedLecture, setRatedLecture] = useState<LectureResponse>(
    lectures[0]
  );

  return (
    <>
      {lectures.length > 0 &&
        lectures.map((lecture, index) => (
          <div key={lecture.id} style={{ width: "100%" }}>
            {index !== 0 && <div className={styles.separator} />}
            <SmartLectureCard
              lecture={lecture}
              openRate={() => setRatedLecture(lecture)}
            />
          </div>
        ))}

      {ratedLecture && (
        <Portal>
          <RateLectureDialog
            lecture={ratedLecture}
            onDismiss={() => setRatedLecture(null)}
          />
        </Portal>
      )}
    </>
  );
};

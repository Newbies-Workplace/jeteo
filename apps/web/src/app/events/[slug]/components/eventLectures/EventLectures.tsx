"use client";

import React from "react";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";
import { SmartLectureCard } from "@/components/molecules/lectureCard/LectureCard";

export interface EventLecturesProps {
  lectures: LectureResponse[];
}

export const EventLectures: React.FC<EventLecturesProps> = ({ lectures }) => {
  return (
    <>
      {lectures.length > 0 &&
        lectures.map((lecture, index) => (
          <div
            key={lecture.id}
            className="w-full flex flex-col items-center justify-center gap-4"
          >
            {index !== 0 && <div className="w-1.5 h-4 rounded bg-stroke" />}
            <SmartLectureCard lecture={lecture} />
          </div>
        ))}
    </>
  );
};

import React from "react";
import {
  SpeakerCard,
  SpeakerCardProps,
} from "@/components/molecules/speakerCard/SpeakerCard";
import { Text } from "@/components/atoms/text/Text";
import { Timer } from "@/components/molecules/timer/Timer";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";
import {
  LectureCardActionsArchive,
  LectureCardActionsFresh,
  LectureCardActionsLive,
} from "@/components/molecules/cardActions/LectureCardActions";
import dayjs from "dayjs";
import YouTube from "react-youtube";

interface LectureProps {
  from: string;
  to: string;
  title: string;
  description: string;
  youtubeVideoId?: string;
  speakers: SpeakerCardProps[];
  children?: React.ReactNode;
}

export const LectureCard: React.FC<LectureProps> = ({
  from,
  to,
  title,
  description,
  youtubeVideoId,
  speakers,
  children,
}) => {
  return (
    <div className="flex flex-col items-center w-full gap-3">
      <Timer from={from} to={to} />
      <div className="flex flex-col items-start self-stretch p-4 gap-4 rounded-2xl bg-white">
        <div className="flex flex-col items-start gap-1 self-stretch">
          <Text variant="headS" bold>
            {title}
          </Text>
          <Text variant="headS" className="whitespace-pre-line">
            {description}
          </Text>
        </div>

        {youtubeVideoId && (
          <YouTube
            videoId={youtubeVideoId}
            className="flex self-stretch"
            iframeClassName="w-full rounded-md"
          />
        )}

        {speakers.length >= 1 && (
          <div className="flex items-start gap-2 self-stretch flex-wrap">
            {speakers.map((item) => {
              return (
                <SpeakerCard
                  key={item.name}
                  avatar={item.avatar}
                  name={item.name}
                  jobTitle={item.jobTitle}
                  socials={item.socials}
                />
              );
            })}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export const SmartLectureCard: React.FC<{ lecture: LectureResponse }> = ({
  lecture,
}) => {
  const now = dayjs();
  const start = dayjs(lecture.from);
  const end = dayjs(lecture.to);
  const freshnessEnd = dayjs(lecture.from).add(2, "day");

  const isLive = now.isAfter(start) && now.isBefore(end);
  const isFresh = now.isAfter(end) && now.isBefore(freshnessEnd);
  const isArchive = now.isAfter(freshnessEnd);

  return (
    <LectureCard
      from={lecture.from}
      to={lecture.to}
      title={lecture.title}
      description={lecture.description}
      youtubeVideoId={lecture.youtubeVideoId}
      speakers={[...lecture.speakers, ...lecture.invites]}
    >
      {isLive && <LectureCardActionsLive lecture={lecture} />}
      {isFresh && <LectureCardActionsFresh lecture={lecture} />}
      {isArchive && <LectureCardActionsArchive lecture={lecture} />}
    </LectureCard>
  );
};

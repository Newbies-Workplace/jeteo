import React from "react";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";
import { Text } from "@/components/atoms/text/Text";
import Image from "next/image";
import ChevronIcon from "@/assets/chevron-stroke.svg";
import { LectureCardActionsArchive } from "@/components/molecules/cardActions/LectureCardActions";
import Link from "next/link";
import { formatFromToDates } from "@/common/utils";
import { Label } from "@/components/atoms/label/Label";

export interface StudioMyLectureCardProps {
  lecture: LectureResponse;
}

export const StudioMyLectureCard: React.FC<StudioMyLectureCardProps> = ({
  lecture,
}) => {
  return (
    <Link
      href={`/studio/events/${lecture.event.slug}/lectures/${lecture.slug}/summary`}
      className="flex flex-col items-start gap-4 p-4 self-stretch rounded-lg border border-stroke bg-surface text-black"
    >
      <div className="w-full">
        <div className="flex items-start justify-between gap-2.5 self-stretch">
          <Text variant="headS" bold>
            {lecture.title}
          </Text>

          <Label text={formatFromToDates(lecture.from, lecture.to)} />
        </div>

        <Text variant="bodyM" className="whitespace-pre-line">
          {lecture.description}
        </Text>
      </div>

      <Link
        href={`/events/${lecture.event.slug}`}
        className="flex items-center gap-1.5 p-2 rounded-md border border-stroke bg-surface cursor-pointer text-black hover:bg-light-hover active:bg-light-active"
      >
        <div className="flex flex-col items-start gap-1 self-stretch">
          <Text variant="bodyM" bold>
            {lecture.event.title}
          </Text>
          {lecture.event.subtitle && (
            <Text variant="bodyM">{lecture.event.subtitle}</Text>
          )}
        </div>

        <Image src={ChevronIcon} alt="" />
      </Link>

      <LectureCardActionsArchive lecture={lecture} />
    </Link>
  );
};

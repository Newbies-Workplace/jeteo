import React, { useState } from "react";
import Delete from "@/assets/delete.svg";
import Edit from "@/assets/edit.svg";
import { Text } from "@/components/atoms/text/Text";
import {
  SpeakerCard,
  SpeakerCardProps,
} from "@/components/molecules/speakerCard/SpeakerCard";
import { Timer } from "@/components/molecules/timer/Timer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteLecture, updateLecture } from "@/lib/actions/lectures";
import { getIdFromSlug } from "shared/util";
import toast from "react-hot-toast";
import { IconButton } from "@/components/atoms/iconButton/IconButton";
import { ConfirmDialog } from "../confirmDialog/ConfirmDialog";
import { Portal } from "../portal/Portal";

interface StudioLectureCardProps {
  eventSlug: string;
  lectureSlug: string;
  from: string;
  to: string;
  title: string;
  description: string;
  speakers: SpeakerCardProps[];
}

export const StudioLectureCard: React.FC<StudioLectureCardProps> = ({
  eventSlug,
  lectureSlug,
  from,
  to,
  title,
  description,
  speakers,
}) => {
  const router = useRouter();
  const navigateToSummary = () => {
    router.replace(
      `/studio/events/${eventSlug}/lectures/${lectureSlug}/summary`
    );
  };
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const onDeleteClick = () => {
    toast.promise(
      deleteLecture(getIdFromSlug(lectureSlug)).then((r) => {
        router.refresh();
      }),
      {
        loading: "Usuwanie...",
        success: <b>Prelekcję usunięto pomyślnie!</b>,
        error: <b>Wystąpił błąd</b>,
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-2 self-stretch min-w-[280px]">
      <Timer from={from} to={to} />
      <div className="relative z-0 flex flex-row justify-between items-center p-4 gap-4 self-stretch bg-surface rounded-lg border border-stroke hover:bg-lightHover active:bg-lightActive cursor-pointer">
        <div
          className="z-3 flex flex-col items-start self-stretch gap-4 w-full"
          onClick={navigateToSummary}
        >
          <div className="flex flex-col items-start gap-1 self-stretch">
            <Text variant="headS" bold>
              {title}
            </Text>
            <Text variant="bodyM">{description}</Text>
          </div>

          {speakers.length >= 1 && (
            <div className="flex items-start content-start gap-2 self-stretch flex-wrap">
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
        </div>

        <div className="z-2 flex flex-col gap-7">
          <Link
            className="z-2"
            href={`/studio/events/edit/${eventSlug}/lectures/edit/${lectureSlug}/basic`}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton icon={Edit} />
          </Link>

          <div
            className="z-2"
            onClick={() => {
              setIsConfirmVisible(true);
            }}
          >
            <IconButton icon={Delete} />
          </div>
          <div className="absolute inset-0 z-1 hidden bg-surface rounded-lg" />

          {isConfirmVisible && (
            <Portal>
              <ConfirmDialog
                title={`Czy na pewno chcesz usunąć ${title}?`}
                description="Tej akcji nie można cofnąć"
                onDismiss={() => setIsConfirmVisible(false)}
                onConfirm={() => onDeleteClick()}
              />
            </Portal>
          )}
        </div>
      </div>
    </div>
  );
};

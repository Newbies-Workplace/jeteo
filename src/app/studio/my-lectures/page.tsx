import { Text } from "@/components/atoms/text/Text";
import React from "react";
import { getMyLectures } from "@/lib/actions/get-lectures";
import { StudioMyLectureCard } from "@/components/molecules/studioLectureCard/StudioMyLectureCard";

export default async function Page() {
  const lectures = await getMyLectures();

  return (
    <div className={"flex flex-col justify-center gap-4"}>
      <Text variant={"headM"} bold>
        Moje prelekcje
      </Text>

      {lectures.length === 0 && (
        <Text variant={"bodyM"}>Nie prowadziłeś jeszcze żadnych prelekcji</Text>
      )}

      {lectures.map((lecture) => (
        <StudioMyLectureCard lecture={lecture} key={lecture.id} />
      ))}
    </div>
  );
}

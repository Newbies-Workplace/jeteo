import { Text } from "@/components/atoms/text/Text";
import React from "react";
import styles from "./page.module.scss";
import { getMyLectures } from "@/common/getLecture";
import { StudioMyLectureCard } from "@/components/molecules/studioLectureCard/StudioMyLectureCard";

export default async function Page() {
  const lectures = await getMyLectures();

  return (
    <div className={styles.container}>
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

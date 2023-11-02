import { Text } from "@/components/atoms/text/Text";
import React from "react";
import styles from "./page.module.scss";
import { getMyLectures } from "@/common/getLecture";
import { StudioMyLectureCard } from "@/components/molecules/studioLectureCard/StudioMyLectureCard";
import { InviteCard } from "@/components/molecules/inviteCard/InviteCard";

export default async function Page() {
  return (
    <div className={styles.container}>
      <Text variant={"headM"} bold>
        Zaproszenia
      </Text>
      <InviteCard />
    </div>
  );
}

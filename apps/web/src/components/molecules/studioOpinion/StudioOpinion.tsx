import React from "react";
import { Text } from "@/components/atoms/text/Text";
import styles from "./StudioOpinion.module.scss";

interface StudioOpinionProps {
  overallRate: number;
  topicRate: number;
  opinion: string;
}

export const StudioOpinion: React.FC<StudioOpinionProps> = ({
  overallRate,
  topicRate,
  opinion,
}) => {
  return (
    <div className={styles.opinion}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.ratings}>
          <div className={styles.ratingItem}>
            <Text variant={"bodyL"} bold className={styles.ratingText}>
              {overallRate}
            </Text>
            <Text variant={"bodyM"}>Prelekcja</Text>
          </div>
          <div className={styles.ratingItem}>
            <Text variant={"bodyL"} bold className={styles.ratingText}>
              {topicRate}
            </Text>
            <Text variant={"bodyM"}>Temat</Text>
          </div>
        </div>
      </div>
      {opinion && (
        <Text className={styles.opinionText} variant={"bodyM"}>
          {opinion}
        </Text>
      )}
    </div>
  );
};

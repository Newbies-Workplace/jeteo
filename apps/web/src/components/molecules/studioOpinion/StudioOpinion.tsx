import React from "react";
import { Text } from "@/components/atoms/text/Text";

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
    <div
      className={
        "flex flex-col self-stretch items-start justify-between p-1 gap-1 bg-surface rounded-2xl border border-stroke"
      }
    >
      <div className={"flex flex-col items-center"}>
        <div className={"flex flex-row items-center gap-1 p-2"}>
          <RatingItem rate={overallRate} label={"Prelekcja"} />
          <RatingItem rate={topicRate} label={"Temat"} />
        </div>
      </div>
      {opinion && (
        <Text className={"flex p-2 pt-0"} variant={"bodyM"}>
          {opinion}
        </Text>
      )}
    </div>
  );
};

const RatingItem: React.FC<{ rate: number; label: string }> = ({
  rate,
  label,
}) => (
  <div
    className={
      "min-w-[100px] flex flex-col justify-center items-center bg-background rounded-lg p-2 border border-stroke"
    }
  >
    <Text variant={"bodyL"} bold className={"text-primary"}>
      {rate}
    </Text>
    <Text variant={"bodyM"}>{label}</Text>
  </div>
);

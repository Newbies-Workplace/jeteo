import React from "react";
import styles from "./RateProgress.module.scss";
import { Text } from "@/components/text/Text";
interface RateProgressProps {
  min: number;
  max: number;
  value: number;
  label?: string;
  description?: string;
}

export const RateProgress: React.FC<RateProgressProps> = ({
  min,
  max,
  value,
  label,
  description,
}) => {
  const progress = (value - min) / (max - min);
  //TODO: Dodać ładniutki progress bo brakuje :(
  return (
    <div className={styles.container}>
      <progress />
      <Text variant={"bodyL"} bold>
        {value + "/" + max}
      </Text>
      <Text variant={"bodyM"} bold>
        {label}
      </Text>
      <Text variant={"bodyS"} bold className={styles.description}>
        {description}
      </Text>
    </div>
  );
};

import { Text } from "@/components/atoms/text/Text";
import styles from "./TextLabel.module.scss";
import React from "react";

interface LabelProps {
  label: string;
  required?: boolean;
}

export const TextLabel: React.FC<LabelProps> = ({
  label,
  required = false,
}) => {
  return (
    <Text variant={"headS"}>
      {label}

      {required && (
        <Text className={styles.requiredStar} variant={"headS"}>
          *
        </Text>
      )}
    </Text>
  );
};

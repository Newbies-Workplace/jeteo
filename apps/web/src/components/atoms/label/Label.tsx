import React from "react";
import { Text } from "@/components/atoms/text/Text";
import styles from "./Label.module.scss";

export interface LabelProps {
  text: string;
}

export const Label: React.FC<LabelProps> = ({ text }) => {
  return <Text className={styles.label}>{text}</Text>;
};

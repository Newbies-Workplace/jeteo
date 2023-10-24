import styles from "./StudioFunctionCard.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Link from "next/link";
import React from "react";

interface StudioFunctionCardProps {
  title: string;
  subtitle: string;
}

export const StudioFunctionCard: React.FC<StudioFunctionCardProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className={styles.card}>
      <Text variant="headM" bold className={styles.title}>
        {title}
      </Text>
      <Text variant="headS" className={styles.title}>
        {subtitle}
      </Text>
    </div>
  );
};

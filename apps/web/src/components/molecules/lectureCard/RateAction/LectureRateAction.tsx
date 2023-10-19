"use client";

import styles from "./LectureRateAction.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Star from "@/assets/star.svg";
import React from "react";
import Image from "next/image";

export const LectureRateAction: React.FC<{ onPress: () => void }> = ({
  onPress,
}) => {
  return (
    <div className={styles.rate} onClick={onPress}>
      <Text variant="headS" bold>
        Oceń prelekcję
      </Text>

      <div className={styles.stars}>
        <Image src={Star} alt={null} className={styles.star} />
        <Image src={Star} alt={null} className={styles.star} />
        <Image src={Star} alt={null} className={styles.star} />
        <Image src={Star} alt={null} className={styles.star} />
        <Image src={Star} alt={null} className={styles.star} />
      </div>
    </div>
  );
};

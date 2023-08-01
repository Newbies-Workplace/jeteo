"use client";

import styles from "./LectureRateAction.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Link from "next/link";
import React from "react";

export const LectureRateAction: React.FC = () => {
  return (
    <Link href="/" className={styles.rate}>
      <Text variant="headS" bold>
        Oceń prelekcję
      </Text>
      <p>*****</p>
    </Link>
  );
};

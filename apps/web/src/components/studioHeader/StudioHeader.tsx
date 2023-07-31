"use client";

import React from "react";
import styles from "./StudioHeader.module.scss";
import { Text } from "@/components/text/Text";
import Image from "next/image";
import arrowBack from "@/assets/arrow-back.svg";
import { useRouter } from "next/navigation";

interface StudioHeaderProps {
  title: string;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <Image
        className={styles.icon}
        src={arrowBack}
        alt="Arrow back"
        onClick={() => router.back()}
      />

      <Text variant="headM" bold>
        {title}
      </Text>
    </div>
  );
};

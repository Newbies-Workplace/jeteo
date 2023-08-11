import React from "react";
import styles from "./Tag.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Image from "next/image";
import Close from "@/assets/close-black.svg";

export const Tag = ({ value, del }) => {
  return (
    <div className={styles.tagContainer}>
      <Text variant="bodyM" className={styles.text}>
        {value}
      </Text>

      <Image
        alt="close"
        src={Close}
        width={16}
        height={16}
        onClick={del}
        className={styles.close}
      />
    </div>
  );
};

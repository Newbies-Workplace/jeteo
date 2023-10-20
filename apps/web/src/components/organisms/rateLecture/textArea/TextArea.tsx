"use client";

import React from "react";
import styles from "./TextArea.module.scss";
import { Text } from "@/components/atoms/text/Text";

export interface TextAreaProps {
  title: string;
  text: string;
  setText: any;
}

const TextArea: React.FC<TextAreaProps> = ({ title, text, setText }) => {
  return (
    <div className={styles.areaWrapper}>
      <Text variant="headS"> {title} </Text>
      <textarea
        className={styles.textArea}
        placeholder="Podziel się swoją opinią, abyśmy mogli dalej doskonalić nasze prelekcje i dostarczać Ci wartościowe treści!"
        maxLength={1000}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <div className={styles.counterWrapper}>
        <Text variant="bodyS">{text?.length ?? 0}/1000</Text>
      </div>
    </div>
  );
};

export default TextArea;

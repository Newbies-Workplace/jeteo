"use client";

import React from "react";
import styles from "./TagPicker.module.scss";
import { Tag } from "./Tag/Tag";
import { useState } from "react";
import { Text } from "@/components/atoms/text/Text";

interface TagPickerProps {
  value?: string[];
  setValue?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagPicker: React.FC<TagPickerProps> = ({ value, setValue }) => {
  const [tagValue, setTagValue] = useState("");

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagValue) {
      const tagToCreate = tagValue.trim();

      if (tagToCreate.length === 0) {
        return;
      }

      if (value?.includes(tagToCreate)) {
        return;
      }

      createTag(tagToCreate);
    }
  };

  function createTag(tagToCreate: string) {
    setValue((prevState) => [...prevState, tagToCreate]);
    setTagValue("");
  }

  function deleteTag(tag: string) {
    setValue((oldTagList) => oldTagList.filter((oldTag) => oldTag !== tag));
  }

  return (
    <div className={styles.tagPicker}>
      {value.map((t) => {
        return <Tag key={t} value={t} del={() => deleteTag(t)} />;
      })}

      {value.length <= 8 ? (
        <input
          minLength={1}
          maxLength={20}
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          onKeyDown={onKeyDown}
          className={styles.input}
          placeholder="Otaguj mnie"
        />
      ) : (
        <Text variant="bodyM">Osiągnięto Limit Tagów</Text>
      )}
    </div>
  );
};

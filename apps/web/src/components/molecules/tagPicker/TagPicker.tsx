"use client";

import React from "react";
import { Tag } from "./Tag/Tag";
import { useState } from "react";
import { Text } from "@/components/atoms/text/Text";

interface TagPickerProps {
  value?: string[];
  setValue: (value: string[]) => void;
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
    setValue([...(value ?? []), tagToCreate]);
    setTagValue("");
  }

  function deleteTag(tag: string) {
    setValue(value?.filter((oldTag) => oldTag !== tag) ?? []);
  }

  return (
    <div
      className={
        "flex flex-wrap items-center p-1 gap-1 min-h-10 w-full rounded-xl border border-stroke bg-background"
      }
    >
      {value?.map((t) => {
        return <Tag key={t} value={t} del={() => deleteTag(t)} />;
      })}

      {value && value.length <= 8 ? (
        <input
          minLength={1}
          maxLength={20}
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          onKeyDown={onKeyDown}
          className={
            "bg-transparent border-none outline-none focus:border-none focus:outline-none"
          }
          placeholder="Otaguj mnie"
        />
      ) : (
        <Text variant="bodyM">Osiągnięto Limit Tagów</Text>
      )}
    </div>
  );
};

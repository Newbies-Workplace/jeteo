"use client";

import React from "react";
import { Text } from "@/components/atoms/text/Text";

export interface TextAreaProps {
  title: string;
  text: string;
  setText: any;
}

const TextArea: React.FC<TextAreaProps> = ({ title, text, setText }) => {
  return (
    <div className={"flex flex-col justify-center items-center gap-2"}>
      <Text variant="headS"> {title} </Text>
      <textarea
        className={
          "bg-background text-gray border-none rounded-2xl p-2 w-full h-32 resize-none focus:outline-1 focus:outline-stroke"
        }
        placeholder="Podziel się swoją opinią, abyśmy mogli dalej doskonalić nasze prelekcje i dostarczać Ci wartościowe treści!"
        maxLength={1000}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <div className={"flex justify-end w-full"}>
        <Text variant="bodyS">{text?.length ?? 0}/1000</Text>
      </div>
    </div>
  );
};

export default TextArea;

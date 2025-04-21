import React from "react";
import { Text } from "@/components/atoms/text/Text";

export interface LabelProps {
  text: string;
}

export const Label: React.FC<LabelProps> = ({ text }) => {
  return (
    <Text className={"p-1 items-start gap-2.5 rounded bg-light"}>{text}</Text>
  );
};

import React from "react";
import { Text } from "@/components/atoms/text/Text";
import { cn } from "@/lib/utils";

interface TagProps {
  className?: string;
  text: string;
}
export const Tag: React.FC<TagProps> = ({ className, text }) => {
  return (
    <Text
      className={cn(
        "flex py-0.5 px-1 justify-center items-center gap-2.5 text-white rounded-full border border-white",
        className
      )}
    >
      {text}
    </Text>
  );
};

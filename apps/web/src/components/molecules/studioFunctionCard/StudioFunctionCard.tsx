import { Text } from "@/components/atoms/text/Text";
import React from "react";

interface StudioFunctionCardProps {
  title: string;
  subtitle: string;
}

export const StudioFunctionCard: React.FC<StudioFunctionCardProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div
      className={
        "flex flex-col items-start justify-end p-3 min-h-[112px] min-w-[200px] w-fit rounded-2xl shadow bg-white hover:bg-light-hover"
      }
    >
      <Text variant="headM" bold>
        {title}
      </Text>
      <Text variant="headS">{subtitle}</Text>
    </div>
  );
};

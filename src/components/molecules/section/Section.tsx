import React from "react";
import { Text } from "@/components/atoms/text/Text";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  contentStyle?: string;
}

export const Section: React.FC<React.PropsWithChildren<SectionProps>> = ({
  title,
  children,
  contentStyle,
}) => {
  return (
    <div className={"flex flex-row w-full"}>
      <div className={"flex flex-col items-center mt-1"}>
        <div className={"min-w-6 min-h-6 bg-gray rounded-full"} />
        <div className={"flex w-[3px] h-full my-2 bg-gray"} />
      </div>
      <div className={"flex flex-col w-full"}>
        <Text className={"pl-2 text-xl text-gray font-bold"}>{title}</Text>
        <div className={cn("flex flex-col gap-3 p-4 pr-0", contentStyle)}>
          {children}
        </div>
      </div>
    </div>
  );
};

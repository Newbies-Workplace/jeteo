"use client";

import React from "react";
import { Text } from "@/components/atoms/text/Text";
import Image from "next/image";
import arrowBack from "@/assets/arrow-back.svg";
import { useRouter } from "next/navigation";

interface StudioHeaderProps {
  title: string;
  returnPath?: string;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  title,
  returnPath,
}) => {
  const router = useRouter();

  return (
    <div
      className={
        "flex items-center text-center gap-3 rounded-xl shadow bg-surface py-2 px-4 break-words"
      }
    >
      <Image
        src={arrowBack}
        alt="Arrow back"
        onClick={() => {
          returnPath ? router.replace(returnPath) : router.back();
        }}
        className={"cursor-pointer"}
        width={24}
        height={24}
      />

      <Text variant="headM" bold>
        {title}
      </Text>
    </div>
  );
};

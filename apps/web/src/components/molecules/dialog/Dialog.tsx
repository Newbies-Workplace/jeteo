"use client";

import { Logo } from "@/components/atoms/logo/Logo";
import { Text } from "@/components/atoms/text/Text";
import React from "react";
import Image from "next/image";
import arrowBackIcon from "@/assets/arrow-back.svg";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DialogProps {
  title: string;
  arrowBack?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  arrowBack = false,
  children,
  className,
}) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "w-full sm:w-[420px] gap-2.5 py-6 bg-white max-sm:absolute bottom-0 flex flex-col items-center rounded-t-2xl sm:rounded-2xl",
        className
      )}
    >
      {arrowBack && (
        <div className={"w-full flex items-start pl-4 -mb-[30px]"}>
          <Image
            width={24}
            height={24}
            className={"cursor-pointer"}
            src={arrowBackIcon}
            alt="Arrow back"
            onClick={() => router.back()}
            data-cy={"back-button"}
          />
        </div>
      )}
      <Logo />
      <Text variant="headM">{title}</Text>
      {children}
    </div>
  );
};

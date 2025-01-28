import React from "react";
import { Text } from "@/components/atoms/text/Text";
import Image from "next/image";
import Close from "@/assets/close-black.svg";

export const Tag = ({ value, del }) => {
  return (
    <div
      className={
        "flex p-1 items-center gap-1 rounded-lg border border-primary bg-surface"
      }
    >
      <Text variant="bodyM" className={"cursor-default"}>
        {value}
      </Text>

      <Image
        alt="close"
        src={Close}
        width={16}
        height={16}
        onClick={del}
        className={"cursor-pointer"}
      />
    </div>
  );
};

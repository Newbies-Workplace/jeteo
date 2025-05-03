"use client";

import React from "react";
import close from "@/assets/close.svg";
import Image from "next/image";

interface FileItemProps {
  url: string;
  onDeleteClick?: () => void;
}

export const FileItem: React.FC<FileItemProps> = ({ url, onDeleteClick }) => {
  return (
    <div
      className={
        "flex justify-end items-start size-[185px] flex-shrink-0 bg-background rounded-[24px] bg-no-repeat bg-center bg-cover"
      }
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      {onDeleteClick && (
        <Image
          className={
            "flex justify-center items-center bg-[#8e8e8e] rounded-full mt-2 mr-2 cursor-pointer hover:bg-[#777777] active:bg-[#444444]"
          }
          src={close}
          alt="Cancel"
          style={{ color: "white" }}
          onClick={() => onDeleteClick()}
        />
      )}
    </div>
  );
};

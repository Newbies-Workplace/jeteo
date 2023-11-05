"use client";

import React from "react";
import styles from "./FileItem.module.scss";
import close from "../../../assets/close.svg";
import Image from "next/image";
import colors from "@/colors.module.scss";
interface FileItemProps {
  url: string;
  onDeleteClick?: () => void;
}

export const FileItem: React.FC<FileItemProps> = ({ url, onDeleteClick }) => {
  return (
    <div
      className={styles.item}
      style={{
        backgroundImage: `url(${url})`,
        backgroundColor: colors.background,
      }}
    >
      {onDeleteClick && (
        <Image
          className={styles.close}
          src={close}
          alt="Cancel"
          style={{ color: "white" }}
          onClick={() => onDeleteClick()}
        />
      )}
    </div>
  );
};

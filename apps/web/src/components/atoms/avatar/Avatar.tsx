import React from "react";
import Image from "next/image";
import defaultAvatar from "@/assets/images/default-profile-pic.svg";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  src: string | undefined;
  size: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
    <Image
      className={styles.avatar}
      src={src ?? defaultAvatar}
      alt={"avatar"}
      width={size}
      height={size}
    />
  );
};

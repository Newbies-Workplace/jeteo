import React from "react";
import Image from "next/image";
import defaultAvatar from "@/assets/images/default-profile-pic.svg";
import styles from "./Avatar.module.scss";
import cs from "classnames";

interface AvatarProps {
  className?: string;
  style?: React.CSSProperties;
  src: string | undefined;
  size: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size,
  className,
  style,
}) => {
  return (
    <Image
      style={style}
      className={cs(styles.avatar, className)}
      src={src ?? defaultAvatar}
      alt={"avatar"}
      width={size}
      height={size}
    />
  );
};

import React from "react";
import Image from "next/image";
import styles from "./IconButton.module.scss";
import cs from "classnames";

interface IconButtonProps {
  icon: string;
  alt?: string;
  primary?: boolean;
  onClick?: () => void;
  size?: "medium" | "small";
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  alt,
  onClick,
  primary = false,
  size = "medium",
}) => {
  const imageSize = size === "medium" ? 24 : 18;

  return (
    <div
      className={cs(styles.iconButton, {
        [styles.primary]: primary,
        [styles.medium]: size === "medium",
        [styles.small]: size === "small",
      })}
      onClick={onClick}
    >
      <Image
        src={icon}
        alt={alt ?? "iconButton"}
        width={imageSize}
        height={imageSize}
      />
    </div>
  );
};

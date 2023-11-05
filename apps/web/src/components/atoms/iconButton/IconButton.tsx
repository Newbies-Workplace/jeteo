import React from "react";
import Image from "next/image";
import styles from "./IconButton.module.scss";
import cs from "classnames";

interface IconButtonProps {
  icon: string;
  alt?: string;
  primary?: boolean;
  onClick?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  alt,
  onClick,
  primary = false,
}) => {
  return (
    <div
      className={cs(styles.iconButton, {
        [styles.primary]: primary,
      })}
    >
      <Image
        src={icon}
        alt={alt ?? "iconButton"}
        onClick={onClick}
        width={24}
        height={24}
      />
    </div>
  );
};

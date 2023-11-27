import React from "react";
import Image from "next/image";
import styles from "./IconButton.module.scss";
import cs from "classnames";

interface IconButtonProps {
  icon: string;
  alt?: string;
  primary?: boolean;
  size?: number;
  btnSize?: number;
  onClick?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  alt,
  onClick,
  primary = false,
  size=24,
  btnSize=40,

}) => {
  return (
    <div
      className={cs(styles.iconButton, {
        [styles.primary]: primary,
      })}
      style={{width: btnSize, height: btnSize}}
    >
      <Image
        src={icon}
        alt={alt ?? "iconButton"}
        onClick={onClick}
        width={size}
        height={size}
      />
    </div>
  );
};

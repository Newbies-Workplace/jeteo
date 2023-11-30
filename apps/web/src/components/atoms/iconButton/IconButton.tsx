import React from "react";
import Image from "next/image";
import styles from "./IconButton.module.scss";
import cs from "classnames";

interface IconButtonProps {
  icon: string;
  alt?: string;
  primary?: boolean;
  btnSize?: number;
  onClick?: () => void;
  size?: "medium" | "small";
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  alt,
  onClick,
  primary = false,
  size = "medium",
<<<<<<< HEAD
  
  // size=24,
  // btnSize=40,


=======
>>>>>>> main
}) => {
  const imageSize = size === "medium" ? 24 : 18;

  return (
    <div
      className={cs(styles.iconButton, {
        [styles.primary]: primary,
        [styles.medium]: size === "medium",
        [styles.small]: size === "small",
<<<<<<< HEAD
      })}    >
        
=======
      })}
    >
>>>>>>> main
      <Image
        src={icon}
        alt={alt ?? "iconButton"}
        onClick={onClick}
<<<<<<< HEAD
        width={size==="medium"?24:size==="small"?18:10}
        height={size==="medium"?24:size==="small"?18:10}
=======
        width={imageSize}
        height={imageSize}
>>>>>>> main
      />
    </div>
  );
};

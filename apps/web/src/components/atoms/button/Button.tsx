"use client";

import React from "react";
import cs from "classnames";
import styles from "./Button.module.scss";
import Image from "next/image";

interface ButtonProps {
  className?: string;
  primary?: boolean;
  style?: React.CSSProperties;
  leftIcon?: string;
  rightIcon?: string;
  iconSize?: number;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  size?: "medium" | "small";
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  primary = false,
  type = "button",
  onClick,
  size = "medium",
  style,
  leftIcon,
  rightIcon,
  iconSize,
}) => {
  return (
    <button
      type={type}
      className={cs(className, styles.button, {
        [styles.primary]: primary,
        [styles.medium]: size === "medium",
        [styles.small]: size === "small",
      })}
      style={style}
      onClick={onClick}
    >
      {leftIcon && <Image alt={"icon"} src={leftIcon} width={iconSize} />}
      {children}
      {rightIcon && <Image alt={"icon"} src={rightIcon} width={iconSize} />}
    </button>
  );
};

export default Button;

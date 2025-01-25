"use client";

import React from "react";
import { cva } from "class-variance-authority";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ButtonProps {
  className?: string;
  primary?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  leftIcon?: string;
  rightIcon?: string;
  iconSize?: number;
  type?: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: "medium" | "small";
}

const buttonStyles = cva(
  "flex min-w-[100px] px-4 py-2 justify-center items-center gap-2 text-center cursor-pointer rounded-lg",
  {
    variants: {
      primary: {
        true: "bg-primary text-white border border-primary hover:bg-primaryHover active:bg-primaryActive",
        false:
          "bg-surface text-black border border-stroke hover:bg-light-hover active:bg-light-active",
      },
      disabled: {
        true: "bg-stroke cursor-not-allowed hover:bg-stroke active:bg-stroke",
        false: "",
      },
      size: {
        medium: "px-4 py-2 text-lg",
        small: "px-4 py-1 text-md",
      },
    },
    defaultVariants: {
      primary: false,
      disabled: false,
      size: "medium",
    },
  }
);

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  primary = false,
  disabled = false,
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
      disabled={disabled}
      className={cn(
        buttonStyles({
          primary,
          disabled,
          size,
        }),
        className
      )}
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

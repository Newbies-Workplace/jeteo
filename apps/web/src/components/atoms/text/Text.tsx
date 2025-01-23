import React from "react";
import styles from "./Text.module.scss";
import { cn } from "@/lib/utils";

interface TextCompProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  variant?: "bodyS" | "bodyM" | "bodyL" | "headS" | "headM" | "headL";
  bold?: boolean;
  className?: string;
}

export const Text: React.FC<TextCompProps> = ({
  className,
  style,
  variant = "bodyM",
  bold = false,
  children,
}) => {
  return (
    <span
      className={cn(styles[variant], { [styles.bold]: bold }, className)}
      style={style}
    >
      {children}
    </span>
  );
};

import React from "react";
import styles from "./Text.module.scss";
import cs from "classnames";

interface TextCompProps {
  children: React.ReactNode;
  variant?: 'bodyS' | 'bodyM' | 'bodyL' | 'headS' | 'headM' | 'headL';
  bold?: boolean;
  className?: string;
}

export const Text: React.FC<TextCompProps> = ({
  variant = 'bodyM',
  bold = false,
  children,
  className,
}) => {
  return (
    <span className={cs(styles[variant], { [styles.bold]: bold }, className)}>
      {children}
    </span>
  );
};

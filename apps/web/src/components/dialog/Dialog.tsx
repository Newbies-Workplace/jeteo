import { Logo } from "../logo/Logo";
import styles from "./Dialog.module.scss";
import { Text } from "@/components/text/Text";
import React from "react";
import cs from "classnames";

interface DialogProps {
  title: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Dialog: React.FC<DialogProps> = ({ title, children, style }) => {
  return (
    <div className={cs(styles.container)} style={style}>
      <Logo />
      <Text variant="headM">{title}</Text>
      {children}
    </div>
  );
};

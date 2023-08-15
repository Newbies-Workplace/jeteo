'use client';

import React from "react";
import cs from "classnames";
import styles from "./SignInButton.module.scss";
import Image from "next/image";

interface SignInButtonProps {
  className?: string;
  style?: React.CSSProperties;
  icon?: string;
  iconSize?: number;
  onClick?: () => void;
}

export const SignInButton: React.FC<
  React.PropsWithChildren<SignInButtonProps>
> = ({ children, className, style, icon, iconSize, onClick }) => {
  return (
    <button
      type="button"
      className={cs(styles.button, className)}
      style={style}
      onClick={onClick}
    >
      {icon && <Image alt={'icon'} src={icon} width={iconSize} />}
      {children}
    </button>
  );
};

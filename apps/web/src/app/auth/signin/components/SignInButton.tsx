"use client";

import React from "react";
import cs from "classnames";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface SignInButtonProps {
  className?: string;
  style?: React.CSSProperties;
  icon?: string;
  iconSize?: number;
}

export const SignInButton: React.FC<
  React.PropsWithChildren<SignInButtonProps>
> = ({ children, className, style, icon, iconSize }) => {
  return (
    <button
      type="button"
      className={cs(
        "flex min-w-[100px] justify-center items-center gap-16 p-[8px_84px_8px_12px] bg-white text-black rounded-[16px] border border-stroke text-center cursor-pointer hover:bg-light-hover active:bg-light-active",
        className
      )}
      style={style}
      onClick={() => {
        signIn("google");
      }}
    >
      {icon && <Image alt={"icon"} src={icon} width={iconSize} />}
      {children}
    </button>
  );
};

import React from "react";
import Link from "next/link";

export const NavButton: React.FC<{
  children: React.ReactNode;
  href: string;
}> = ({ children, href }) => {
  return (
    <Link
      href={href}
      className={
        "flex flex-row p-2 self-stretch items-center gap-2 max-w-[300px] rounded-lg border-2 border-primary shadow shadow-primary bg-surface hover:bg-light-hover active:bg-light-active no-underline text-black"
      }
    >
      {children}
    </Link>
  );
};

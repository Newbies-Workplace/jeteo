import React from "react";
import Link from "next/link";
import cs from "classnames";
import styles from "./NavButton.module.scss";

export const NavButton: React.FC<{
  children: React.ReactNode;
  href: string;
}> = ({ children, href }) => {
  return (
    <Link href={href} className={cs(styles.navButton)}>
      {children}
    </Link>
  );
};

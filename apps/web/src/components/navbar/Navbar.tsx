import React from "react";
import styles from "./Navbar.module.scss";
import { Logo } from "@/components/logo/Logo";
import Link from "next/link";

interface NavbarProps {
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <div className={styles.navbar}>
      <Link href={"/"}>
        <Logo />
      </Link>

      {children}
    </div>
  );
};

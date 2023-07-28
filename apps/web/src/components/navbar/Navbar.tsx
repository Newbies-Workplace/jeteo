import React from "react";
import styles from "./Navbar.module.scss";
import { Logo } from "../logo/Logo";

interface NavbarProps {
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <div className={styles.navbar}>
      <Logo variant="logoM"/>
      {children}
    </div>
  );
};

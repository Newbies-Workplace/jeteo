import React from "react";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <div className={styles.navbar}>
      <span>jeteo</span>

      {children}
    </div>
  );
};

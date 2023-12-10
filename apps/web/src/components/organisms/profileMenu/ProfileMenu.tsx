"use client";

import UserMenu from "./menus/userMenu/UserMenu";
import GuestMenu from "./menus/guestMenu/GuestMenu";
import { useAuth } from "@/contexts/Auth.hook";
import Image from "next/image";
import burger from "@/assets/burger.svg";
import burgerWhite from "@/assets/burger-white.svg";
import styles from "./ProfileMenu.module.scss";
import React, { useEffect, useRef, useState } from "react";

const isDev: boolean = process.env["ENV"] === "dev";

export interface ProfileMenuProps {
  invertColors?: boolean;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ invertColors }) => {
  const { user } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.menuContainer} ref={dropdownRef}>
      <Image
        data-cy={isDev ? "open-menu" : undefined}
        style={{ cursor: "pointer" }}
        alt="Open menu"
        src={invertColors ? burgerWhite : burger}
        onClick={() => setShowMenu(!showMenu)}
      />
      <div className={styles.menuContainer}>
        {showMenu && (user ? <UserMenu /> : <GuestMenu />)}
      </div>
    </div>
  );
};

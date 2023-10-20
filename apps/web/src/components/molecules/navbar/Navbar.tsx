import React from "react";
import styles from "./Navbar.module.scss";
import { Logo } from "@/components/atoms/logo/Logo";
import Link from "next/link";
import cs from "classnames";
import ProfileMenu from "@/components/organisms/profileMenu/ProfileMenu";

interface NavbarProps {
  invertColor?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ invertColor }) => {
  return (
    <div className={cs(styles.navbar, { [styles.invertColor]: invertColor })}>
      <Link href={"/"}>
        <Logo invertColor={invertColor} />
      </Link>
      <div>
        <ProfileMenu />
      </div>
    </div>
  );
};

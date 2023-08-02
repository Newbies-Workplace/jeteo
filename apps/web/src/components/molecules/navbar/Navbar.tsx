import React from "react";
import styles from "./Navbar.module.scss";
import { Logo } from "@/components/atoms/logo/Logo";
import Link from "next/link";
import Image from "next/image";
import burger from "@/assets/Burger.svg";
import cs from "classnames";

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
        <Link href={"/studio/events"}>studio</Link>
        <Link href={"/auth/signin"}>
          <Image alt="Open menu" src={burger} className={styles.burger} />
        </Link>
      </div>
    </div>
  );
};

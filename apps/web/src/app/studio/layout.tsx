import { Navbar } from "@/components/molecules/navbar/Navbar";
import React from "react";
import styles from "./layout.module.scss";
import Link from "next/link";
import Image from "next/image";
import calendarIcon from "@/assets/calendar.svg";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.navigation}>
          <span className={styles.studioLogo}>Studio</span>
          <NavButton href={"/studio/events"}>
            <Image src={calendarIcon} alt={""} />
            Wydarzenia
          </NavButton>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

const NavButton: React.FC<{ children: React.ReactNode; href: string }> = ({
  children,
  href,
}) => {
  return (
    <Link href={href} className={styles.navButton}>
      {children}
    </Link>
  );
};

import { Navbar } from "@/components/navbar/Navbar";
import React from "react";
import styles from "./layout.module.scss";
import Link from "next/link";
import Image from "next/image";
import calendarIcon from "@/assets/calendar.svg";
import { RateProgress } from "@/components/rateProgress/RateProgress";

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
      <RateProgress
        min={0}
        max={5}
        value={3}
        label={"temat"}
        description={"Bardzo długi opis tego komponentu. Oj bardzo długi?"}
      />
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

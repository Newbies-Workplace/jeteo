import { Navbar } from "@/components/molecules/navbar/Navbar";
import React from "react";
import styles from "./layout.module.scss";
import Image from "next/image";
import person from "@/assets/person.svg";
import { NavButton } from "@/components/molecules/navButton/NavButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.navigation}>
          <span className={styles.studioLogo}>Ustawienia</span>
          <NavButton href={"/settings"}>
            <Image src={person} alt={""} />
            Profil
          </NavButton>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

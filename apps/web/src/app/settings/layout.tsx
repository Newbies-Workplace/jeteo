import { Navbar } from "@/components/molecules/navbar/Navbar";
import React from "react";
import styles from "./layout.module.scss";
import Image from "next/image";
import person from "@/assets/person.svg";
import { NavButton } from "@/components/molecules/navButton/NavButton";
import AuthRoot from "@/contexts/Auth.root";
import { SettingsPage } from "@/contexts/loaders/settings.page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthRoot loader={<SettingsPage />}>
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
    </AuthRoot>
  );
}

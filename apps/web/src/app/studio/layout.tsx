import { Navbar } from "@/components/molecules/navbar/Navbar";
import React from "react";
import styles from "./layout.module.scss";
import Image from "next/image";
import calendarIcon from "@/assets/calendar.svg";
import lectureIcon from "@/assets/lecture.svg";
import inviteIcon from "@/assets/invite.svg";
import { NavButton } from "@/components/molecules/navButton/NavButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.navigation}>
          <span className={styles.studioLogo}>Studio</span>
          <NavButton href={"/studio/events"}>
            <Image src={calendarIcon} alt={"Wydarzenia"} />
            Wydarzenia
          </NavButton>
          <NavButton href={"/studio/my-lectures"}>
            <Image src={lectureIcon} alt={"Prelekcje"} />
            Moje prelekcje
          </NavButton>
          <NavButton href={"/studio/invites"}>
            <Image src={inviteIcon} alt={"Zaproszenia"} />
            Zaproszenia
          </NavButton>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

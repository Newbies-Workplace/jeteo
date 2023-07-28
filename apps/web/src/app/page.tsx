"use client";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { NavMenu } from "@/components/navmenu/NavMenu";
import { GetUser } from "@/components/home/GetUser";
import { IsFullyRegistered } from "@/components/home/IsFullyRegistered";
import { Text } from "@/components/text/Text";
import styles from "@/app/page.module.scss";
import { FileUpload } from "@/components/fileUpload/FileUpload";

export default function Page() {
  return (
    <>
      <Navbar>
        <NavMenu />
      </Navbar>
      
      <FileUpload onChange={() => {}}></FileUpload>
      <div className={styles.main}>
        <Text variant="headM">
          Witaj, <GetUser /> 👋
        </Text>

        <IsFullyRegistered />

        <div>
          <p>Wydarzenia dla ciebie</p>
          {/* TODO: dodac tu komponent z karteckzami eventu */}
          <div className={styles.example}></div>
        </div>
        <div>
          <p>Wszystkie wydarzenia</p>
          {/* TODO: dodac tu komponent z karteckzami eventu */}
          <div className={styles.example}></div>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import styles from "@/app/not-found.module.scss";
import Image from "next/image";
import notFoundText from "@/assets/images/not-found.svg";
import planetWhere from "@/assets/images/planet-where.svg";
import startPath from "@/assets/images/start-path.svg";
import React from "react";
import GalaxyBackground from "@/components/molecules/galaxyBackground/GalaxyBackground";
import { Navbar } from "@/components/molecules/navbar/Navbar";
import Button from "@/components/atoms/button/Button";
import { Text } from "@/components/atoms/text/Text";

export default function NotFound() {
  return (
    <GalaxyBackground hidePlanets>
      <Navbar invertColor />

      <div className={styles.container}>
        <Image src={notFoundText} alt="Not Found" />
        <div className={styles.textContainer}>
          <Text variant="headL" bold className={styles.title}>
            Gdzie ja to miałem?
          </Text>
          <Text variant="headM" className={styles.title}>
            miejsce do którego zmierzasz już nie istnieje lub nigdy nie istniało
          </Text>
        </div>
        <Link href={"/"}>
          <Button primary size="small">
            Zabierz mnie na stronę główną
          </Button>
        </Link>
      </div>
      <div className={styles.imageContainer}>
        <Image src={planetWhere} alt="Planet Where" />
        <Image src={startPath} alt="Start Patrh" />
      </div>
    </GalaxyBackground>
  );
}

import Link from "next/link";
import GalaxyBackground from "@/components/galaxyBackground/GalaxyBackground";
import styles from "@/app/not-found.module.scss";
import Image from "next/image";
import notFoundText from "@/assets/images/not-found.svg";
import { Text } from "@/components/text/Text";
import Button from "@/components/button/Button";
import planetWhere from "@/assets/images/planet-where.svg";
import startPath from "@/assets/images/start-path.svg";
import { Navbar } from "@/components/navbar/Navbar";

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
          <Button primary className={styles.button} size="small">
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

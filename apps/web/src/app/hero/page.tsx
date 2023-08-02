"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import planetViolet from "@/assets/images/planet-violet.svg";
import planetOrange from "@/assets/images/planet-orange.svg";
import planetPinkGreen from "@/assets/images/planet-pink-green.svg";
import planetBlue from "@/assets/images/planet-blue.svg";
import moon from "@/assets/images/moon-decoration.svg";
import presentation from "@/assets/images/presentation-svg.svg";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import GalaxyBackground from "@/components/molecules/galaxyBackground/GalaxyBackground";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";
import Link from "next/link";

export default function Page() {
  return (
    <GalaxyBackground hidePlanets>
      <Parallax pages={2}>
        <ParallaxLayer offset={0} speed={-1.25} style={{ zIndex: 0 }}>
          <Image
            src={planetPinkGreen}
            alt={"planetPinkGreen"}
            width={85}
            height={85}
            className={styles.planetPinkGreen}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.75} style={{ zIndex: 0 }}>
          <Image
            src={planetOrange}
            alt={"planetOrange"}
            width={156}
            height={156}
            className={styles.planetOrange}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-1} style={{ zIndex: 0 }}>
          <Image
            src={planetViolet}
            alt={"planetViolet"}
            width={53}
            height={53}
            className={styles.planetViolet}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={-0.15}
          style={{
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 64,
            marginTop: "-8%",
          }}
        >
          <div className={styles.logo}>
            <Image
              src={planetBlue}
              alt={"Planet Blue"}
              className={styles.planetBlue}
            />
            <div className={styles.logoTextContainer}>
              <Text className={styles.logoText}>jeteo</Text>
              <Text variant={"headM"}>Portal do dzielenia się wiedzą!</Text>
            </div>
          </div>

          <Link href={"/"}>
            <Button
              primary
              size="small"
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              Sprawdź listę wydarzeń
            </Button>
          </Link>
        </ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={1}
          style={{
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <div className={styles.contentOnMoon}>
            <Image src={moon} alt={"Moon"} className={styles.moon} />
            <div className={styles.items}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text variant={"headL"} bold className={styles.text}>
                  Zbieraj wiedzę
                </Text>
                <Text variant={"bodyL"} className={styles.text}>
                  Jesteśmy przekonani iż wiedza od ekspertów, jest warta więcej
                  niż jakikolwiek poradnik na youtube. Staramy się stworzyć
                  miejsce z wyłącznie takich ekspertów.
                </Text>
              </div>
              <Image src={presentation} alt={"Presentation"} />
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </GalaxyBackground>
  );
}

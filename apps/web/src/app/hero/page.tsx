"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import planetViolet from "@/assets/images/planet-violet.svg";
import planetOrange from "@/assets/images/planet-orange.svg";
import planetPinkGreen from "@/assets/images/planet-pink-green.svg";
import planetBlue from "@/assets/images/planet-blue.svg";
import moon from "@/assets/images/moon-decoration.svg";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import GalaxyBackground from "@/components/molecules/galaxyBackground/GalaxyBackground";
import { Text } from "@/components/atoms/text/Text";

export default function Page() {
  return (
    <GalaxyBackground hidePlanets>
      <Parallax pages={2}>
        <ParallaxLayer offset={0} speed={-1.25}>
          <Image
            className={styles.planetPinkGreen}
            src={planetPinkGreen}
            alt={"Planet Pink Green"}
            width={85}
            height={85}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.75}>
          <Image
            className={styles.planetOrange}
            src={planetOrange}
            alt={"Planet Orange"}
            width={156}
            height={156}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-1}>
          <Image
            className={styles.planetViolet}
            src={planetViolet}
            alt={"Planet Violet"}
            width={53}
            height={53}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.5}>
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
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={1}>
          <Image src={moon} alt={"Moon"} className={styles.moon} />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={1}>
          <div className={styles.contentOnMoon}>CCCCCCCCCCCC</div>
        </ParallaxLayer>
      </Parallax>
    </GalaxyBackground>
  );
}

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
import Button from "@/components/atoms/button/Button";
import Link from "next/link";

export default function Page() {
  //TODO trzeba zmiejszac width | hight na parallax Layer bo lipa jakaś się robi, z klikaniem bo zawsze jest dla tego komponentu width i height 100%
  return (
    <GalaxyBackground hidePlanets>
      <Parallax pages={2}>
        <ParallaxLayer
          offset={0}
          speed={-1.25}
          className={styles.planetPinkGreen}
          style={{
            pointerEvents: "none",
            maxHeight: 85,
            maxWidth: 85,
          }}
        >
          <Image
            className={styles.planetPinkGreen}
            src={planetPinkGreen}
            alt={"Planet Pink Green"}
            width={85}
            height={85}
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={-0.75}
          style={{
            pointerEvents: "none",
          }}
        >
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
        <ParallaxLayer
          offset={0}
          speed={-0.5}
          style={{
            pointerEvents: "none",
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
              }}
              onClick={() => console.log("Button clicked")}
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
          }}
        >
          <Image src={moon} alt={"Moon"} className={styles.moon} />
        </ParallaxLayer>
        {/* <ParallaxLayer offset={0} speed={1} style={{
          pointerEvents: 'none'
        }}>
          <div className={styles.contentOnMoon}></div>
        </ParallaxLayer> */}
      </Parallax>
    </GalaxyBackground>
  );
}

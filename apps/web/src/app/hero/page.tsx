"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import planetViolet from "@/assets/images/planet-violet.svg";
import planetOrange from "@/assets/images/planet-orange.svg";
import planetPinkGreen from "@/assets/images/planet-pink-green.svg";
import planetBlue from "@/assets/images/planet-blue.svg";
import moon from "@/assets/images/moon-decoration.svg";
import presentation from "@/assets/images/presentation-svg.svg";
import bottomBackground from "@/assets/images/hero-bottom-background.svg";
import newbies from "@/assets/newbies.svg";
import rst from "@/assets/RST.svg";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import GalaxyBackground from "@/components/molecules/galaxyBackground/GalaxyBackground";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";
import Link from "next/link";

//todo planety powinny sie chować bo jest przerwa pomiedzy offset 0 a 1
//todo fajnie jakby gwiazdy na background tez sie przesuwaly
//todo zeby wykonac efekt ze coś zza ksiezyca wylatuje (od dołu) to musi miec speed -1 i musi miec domyslna pozycje na pod ksiezycem
//todo na mobilce nie wyglada to za dobrze trzeba dostosować sobno css dla tabletow i mobilek
//todo lepsze zdjęcie ksiezyca - moze osobno eksport kazdych lementow bez poświaty bo czarna kreska jest
export default function Page() {
  return (
    <Parallax pages={2}>
      <ParallaxLayer offset={0} speed={1} style={{ zIndex: 0 }}>
        <GalaxyBackground hidePlanets />
      </ParallaxLayer>
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
          <Image src={moon} alt={"Moon"} className={styles.moon} priority />
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
      <ParallaxLayer
        offset={1}
        speed={1}
        style={{
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <Image src={bottomBackground} alt={"bottomBackground"} priority fill />
      </ParallaxLayer>
      <ParallaxLayer
        offset={1}
        speed={3}
        style={{
          zIndex: 4,
        }}
      >
        <div className={styles.footer}>
          <div className={styles.textWithImage}>
            <Text variant={"headS"}>
              Platforma realizowana przez{" "}
              {
                <Link href={"http://newbies.pl/"} className={styles.link}>
                  newbies
                </Link>
              }
            </Text>
            <Image src={newbies} alt={"Newbies"} width={24} height={24} />
          </div>
          <div className={styles.textWithImage}>
            <Text variant={"headS"}>
              powered by{" "}
              {
                <Link
                  href={"https://www.rst.software/"}
                  className={styles.link}
                >
                  RST
                </Link>
              }
            </Text>
            <Image src={rst} alt={"rst"} width={24} height={24} />
          </div>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
}

"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import planetViolet from "@/assets/images/planet-violet.svg";
import planetOrange from "@/assets/images/planet-orange.svg";
import planetPinkGreen from "@/assets/images/planet-pink-green.svg";
import planetBlue from "@/assets/images/planet-blue.svg";
import moon from "@/assets/images/moon-decoration.svg";
import presentation from "@/assets/images/presentation-svg.svg";
import newbies from "@/assets/newbies.svg";
import rst from "@/assets/RST.svg";
import wave from "@/assets/images/wave.svg";
import planetUfoSwarm from "@/assets/images/planet-ufoswarm.svg";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";
import Link from "next/link";
import { GalaxyBackground } from "@/components/molecules/galaxyBackground/GalaxyBackground";
import React, { useEffect, useRef } from "react";
import { animated, useSpringValue } from "@react-spring/web";

//todo na mobilce nie wyglada to za dobrze trzeba dostosować sobno css dla tabletow i mobilek
//todo lepsze zdjęcie ksiezyca - moze osobno eksport kazdych lementow bez poświaty bo czarna kreska jest
export default function Page() {
  const parallax = useRef();

  const opacityPingGreen = useSpringValue(1);
  const opacityOrange = useSpringValue(1);
  const opacityViolet = useSpringValue(1);
  const opacityBottomContent = useSpringValue(0);

  useEffect(() => {
    const container = document.querySelector(".parallax");
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (parallax.current) {
      // @ts-ignore
      setTimeout(async () => {
        // @ts-ignore
        if (parallax.current.current >= 370) {
          opacityPingGreen.set(0);
        } else {
          opacityPingGreen.set(1);
        }

        // @ts-ignore
        if (parallax.current.current >= 280) {
          opacityOrange.set(0);
        } else {
          opacityOrange.set(1);
        }

        // @ts-ignore
        if (parallax.current.current >= 200) {
          opacityViolet.set(0);
        } else {
          opacityViolet.set(1);
        }

        // @ts-ignore
        if (parallax.current.current >= 500) {
          opacityBottomContent.set(1);
        } else {
          opacityBottomContent.set(0);
        }
      }, 250);
    }
  };

  return (
    <GalaxyBackground hidePlanets>
      <Parallax pages={2} ref={parallax} className="parallax">
        <ParallaxLayer offset={0} speed={-1.25} style={{ zIndex: 0 }}>
          <animated.div
            style={{ opacity: opacityPingGreen }}
            className={styles.planetPinkGreen}
          >
            <Image
              src={planetPinkGreen}
              alt="planetPinkGreen"
              width={85}
              height={85}
            />
          </animated.div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.75} style={{ zIndex: 0 }}>
          <animated.div
            style={{ opacity: opacityOrange }}
            className={styles.planetOrange}
          >
            <Image
              src={planetOrange}
              alt={"planetOrange"}
              width={156}
              height={156}
            />
          </animated.div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-1} style={{ zIndex: 0 }}>
          <animated.div
            style={{ opacity: opacityViolet }}
            className={styles.planetViolet}
          >
            <Image
              src={planetViolet}
              alt={"planetViolet"}
              width={53}
              height={53}
            />
          </animated.div>
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
          offset={1}
          speed={1}
          style={{
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <div className={styles.contentOnMoon}>
            <Image src={moon} alt={"Moon"} className={styles.moon} priority />
            <div className={styles.items}>
              <div className={styles.textContainer}>
                <Text variant={"headL"} bold className={styles.text}>
                  Zbieraj wiedzę
                </Text>
                <Text variant={"bodyL"} className={styles.text}>
                  Jesteśmy przekonani iż wiedza od ekspertów, jest warta więcej
                  niż jakikolwiek poradnik na youtube. Staramy się stworzyć
                  miejsce z wyłącznie takich ekspertów.
                </Text>
              </div>
              <Image
                src={presentation}
                alt={"Presentation"}
                style={{ marginTop: 15 }}
              />
            </div>
            <Image src={wave} alt={"wave"} className={styles.wave} priority />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={-1}
          style={{
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <animated.div
            style={{
              opacity: opacityBottomContent,
              zIndex: 1,
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              alignSelf: "stretch",
              flexWrap: "wrap",
            }}
          >
            <Image
              src={planetUfoSwarm}
              alt={"planetUfoSwarm"}
              style={{ marginTop: 15 }}
            />
            <div className={styles.galaxyTextContainer}>
              <Text variant={"headL"} bold className={styles.text}>
                Dziel się wiedzą
              </Text>
              <Text variant={"bodyL"} className={styles.text}>
                Masz ego nie z tego świata i potrzebę wygadania się? To miejsce
                stworzone dla ciebie! Jedynie co potrzebujesz to bycie ekspertem
                i potężnego pytonga.
              </Text>
            </div>
          </animated.div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={3}
          style={{
            zIndex: 1,
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
    </GalaxyBackground>
  );
}

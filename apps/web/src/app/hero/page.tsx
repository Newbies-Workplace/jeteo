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
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";
import Link from "next/link";
import { GalaxyBackground } from "@/components/molecules/galaxyBackground/GalaxyBackground";
import React, { useEffect, useRef } from "react";
import { animated, useSpringValue } from "@react-spring/web";

export default function Page() {
  const parallax = useRef<IParallax>();

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
    const current: number = parallax.current ? parallax.current.current : null;

    setTimeout(async () => {
      opacityPingGreen.set(current >= 400 ? 0 : 1);
      opacityOrange.set(current >= 280 ? 0 : 1);
      opacityViolet.set(current >= 200 ? 0 : 1);
      opacityBottomContent.set(
        current >= 460 && current < 475
          ? 0.5
          : current >= 475 && current < 500
          ? 0.75
          : current >= 500
          ? 1
          : 0
      );
    }, 150);
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
              className={styles.planetPinkGreenImg}
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
              className={styles.planetOrangeImg}
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
              className={styles.planetVioletImg}
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
          style={{ zIndex: 1 }}
          className={styles.logoSection}
        >
          <div className={styles.logo}>
            <Image
              src={planetBlue}
              alt={"Planet Blue"}
              className={styles.planetBlue}
              width={213}
              height={213}
            />
            <div className={styles.logoTextContainer}>
              <Text className={styles.logoText}>jeteo</Text>
              <Text variant={"headM"}>Portal do dzielenia się wiedzą!</Text>
            </div>
          </div>
          <Link href={"/"}>
            <Button className={styles.button} primary size="small">
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
                  Jesteśmy głęboko przekonani, że wiedza dostarczana przez
                  ekspertów posiada znacznie większą wartość niż jakikolwiek
                  poradnik dostępny na YouTube. W związku z tym, dążymy do
                  utworzenia środowiska skupiającego wyłącznie takich
                  specjalistów.
                </Text>
              </div>
              <Image
                className={styles.presentation}
                src={presentation}
                alt={"Presentation"}
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
            }}
            className={styles.galaxyContent}
          >
            <div className={styles.galaxyTextContainer}>
              <Text variant={"headL"} bold className={styles.text}>
                Dziel się wiedzą
              </Text>
              <Text variant={"bodyL"} className={styles.text}>
                Masz wiarę we własne umiejętności i chęć dzielenia się wiedzą?
                To miejsce powstało właśnie z myślą o Tobie! Wystarczy posiadać
                garść wiedzy z obszaru programowania, aby dołączyć do naszej
                społeczności pasjonatów technologii.
              </Text>
            </div>
            <Image
              className={styles.planetUfoSwarm}
              src={planetUfoSwarm}
              alt={"planetUfoSwarm"}
            />
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

"use client";

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
        <ParallaxLayer offset={0} speed={-1.25} className={"z-0"}>
          <animated.div
            style={{ opacity: opacityPingGreen }}
            className={"absolute top-[10%] right-[20%]"}
          >
            <Image
              className={"size-[85px] md:size-24"}
              src={planetPinkGreen}
              alt="planetPinkGreen"
              width={85}
              height={85}
            />
          </animated.div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.75} className={"z-0"}>
          <animated.div
            style={{ opacity: opacityOrange }}
            className={"absolute top-[60%] right-[8%]"}
          >
            <Image
              className={"size-[156px] md:size-[124px]"}
              src={planetOrange}
              alt={"planetOrange"}
              width={156}
              height={156}
            />
          </animated.div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-1} className={"z-0"}>
          <animated.div
            style={{ opacity: opacityViolet }}
            className={"absolute top-[70%] left-[10%]"}
          >
            <Image
              className={"size-[53px] md:size-[42px]"}
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
          className={
            "z-[1] flex flex-col justify-center items-center gap-16 -mt-[8%] max-sm:-mt-[30%] max-sm:mx-[5%]"
          }
        >
          <div
            className={
              "w-full flex flex-row gap-6 text-left justify-center items-center"
            }
          >
            <Image
              src={planetBlue}
              alt={"Planet Blue"}
              className={
                "z-[1] size-[160px] md:size-[213px] rounded-full shadow-[0_0_32px_0_rgba(0,148,255,0.25),2px_-2px_8px_0_rgba(255,255,255,0.15)]"
              }
              width={213}
              height={213}
            />
            <div
              className={
                "text-shadow-[0_1px_8px_0_rgba(0,0,0,0.5)] text-white flex flex-col gap-2"
              }
            >
              <span
                className={
                  "font-oswald leading-normal -mt-6 text-xl md:text-5xl"
                }
              >
                jeteo
              </span>
              <span>Portal do dzielenia się wiedzą!</span>
            </div>
          </div>
          <Link href={"/"}>
            <Button className={"px-4 py-2"} primary size="small">
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
          <div
            className={
              "flex flex-col w-full absolute max-sm:-top-[120%] max-lg:-top-[140%] -top-[160%]"
            }
          >
            <Image
              src={moon}
              alt={"Moon"}
              className={"h-auto w-full select-none"}
              priority
            />
            <div
              className={
                "-mt-[4%] flex flex-row-reverse pb-0 md:pb-32 justify-center items-center content-center gap-8 sm:gap-16 md:gap-[167px] px-4 md:px-8 self-stretch flex-wrap bg-background"
              }
            >
              <div className={"flex flex-col mt-7.5 gap-3"}>
                <Text variant={"headL"} bold className={"break-words max-w-lg"}>
                  Zbieraj wiedzę
                </Text>
                <Text variant={"bodyL"} className={"break-words max-w-lg"}>
                  Jesteśmy głęboko przekonani, że wiedza dostarczana przez
                  ekspertów posiada znacznie większą wartość niż jakikolwiek
                  poradnik dostępny na YouTube. W związku z tym, dążymy do
                  utworzenia środowiska skupiającego wyłącznie takich
                  specjalistów.
                </Text>
              </div>
              <Image
                className={"mt-4"}
                src={presentation}
                alt={"Presentation"}
              />
            </div>
            <Image
              src={wave}
              alt={"wave"}
              className={"-mt-1 sm:-mt-6 md:-mt-8 h-fit w-full select-none"}
              priority
            />
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
            className={
              "flex flex-col lg:flex-row p-4 justify-center items-center content-center self-stretch"
            }
          >
            <div className={"flex flex-col mt-15 gap-3 text-white"}>
              <Text variant={"headL"} bold className={"break-words max-w-lg"}>
                Dziel się wiedzą
              </Text>
              <Text variant={"bodyL"} className={"break-words max-w-lg"}>
                Masz wiarę we własne umiejętności i chęć dzielenia się wiedzą?
                To miejsce powstało właśnie z myślą o Tobie! Wystarczy posiadać
                garść wiedzy z obszaru programowania, aby dołączyć do naszej
                społeczności pasjonatów technologii.
              </Text>
            </div>
            <Image
              className={"mt-[70px]"}
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
          <div
            className={
              "w-full absolute bottom-0 flex flex-col md:flex-row p-4 px-2.5 justify-center items-center gap-4 self-stretch bg-black text-white"
            }
          >
            <div className={"flex gap-1"}>
              <Text variant={"headS"}>
                Platforma realizowana przez{" "}
                {
                  <Link
                    href={"https://newbies.pl/"}
                    className={"underline text-white"}
                  >
                    newbies
                  </Link>
                }
              </Text>
              <Image src={newbies} alt={"Newbies"} width={24} height={24} />
            </div>
            <div className={"flex gap-1"}>
              <Text variant={"headS"}>
                powered by{" "}
                {
                  <Link
                    href={"https://www.rst.software/"}
                    className={"underline text-white"}
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

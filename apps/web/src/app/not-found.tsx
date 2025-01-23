import Link from "next/link";
import Image from "next/image";
import notFoundText from "@/assets/images/not-found.svg";
import planetWhere from "@/assets/images/planet-where.svg";
import startPath from "@/assets/images/start-path.svg";
import React from "react";
import { GalaxyBackground } from "@/components/molecules/galaxyBackground/GalaxyBackground";
import { Navbar } from "@/components/molecules/navbar/Navbar";
import Button from "@/components/atoms/button/Button";
import { Text } from "@/components/atoms/text/Text";

export default function NotFound() {
  return (
    <GalaxyBackground hidePlanets>
      <Navbar invertColor />

      <div
        className={
          "flex items-center flex-col gap-8 h-fit absolute inset-2 top-1/4 bottom-1/4 md:items-start max-md:text-center md:top-[25%] md:bottom-[25%] md:left-[240px] md:right-[16px] z-[2] text-white"
        }
      >
        <Image src={notFoundText} alt="Not Found" />
        <div className={"max-2-[550px] inline-flex flex-col"}>
          <Text variant="headL" bold>
            Gdzie ja to miałem?
          </Text>
          <Text variant="headM">
            miejsce do którego zmierzasz już nie istnieje lub nigdy nie istniało
          </Text>
        </div>
        <Link href={"/"} className={"w-fit"}>
          <Button primary size="small">
            Zabierz mnie na stronę główną
          </Button>
        </Link>
      </div>
      <div
        className={
          "inline-flex flex-col items-end mt-[15%] mr-[25%] absolute inset-0 max-md:hidden"
        }
      >
        <Image src={planetWhere} alt="Planet Where" />
        <Image src={startPath} alt="Start Patrh" />
      </div>
    </GalaxyBackground>
  );
}

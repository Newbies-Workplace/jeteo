import React from "react";
import styles from "./GalaxyBackground.module.scss";
import PlanetViolet from "@/assets/images/planet-violet.svg";
import PlanetBlue from "@/assets/images/planet-blue.svg";
import SpaceFog from "@/assets/images/space-fog.svg";
import Ufo1 from "@/assets/images/ufo-1.svg";
import Ufo2 from "@/assets/images/ufo-2.svg";
import Ufo3 from "@/assets/images/ufo-3.svg";
import Rocket from "@/assets/images/rocket.svg";
import PlanetYellow from "@/assets/images/planet-yellow.svg";
import SpaceElectricVehicle from "@/assets/images/chair.svg";
import Image from "next/image";

interface GalaxyBackgroundProps {
  hideStars?: boolean;
  hideComets?: boolean;
  hidePlanets?: boolean;
  hideUfoSwarm?: boolean;
  hideRocket?: boolean;
  hideVehicle?: boolean;
  style?: React.CSSProperties;
}

export const GalaxyBackground: React.FC<
  React.PropsWithChildren<GalaxyBackgroundProps>
> = ({
  children,
  hideStars,
  hideComets,
  hidePlanets,
  hideUfoSwarm,
  hideRocket,
  hideVehicle,
  style,
}) => {
  return (
    <div
      className={"relative h-screen overflow-hidden bg-space-dark"}
      style={{
        backgroundImage: `url(${SpaceFog.src})`,
        backgroundSize: "cover",
        ...style,
      }}
    >
      {!hideStars && (
        <>
          <div className={styles.stars} />
          <div className={styles.stars2} />
          <div className={styles.stars3} />
        </>
      )}

      {!hideComets && (
        <>
          <div className={"absolute -top-[100px] w-screen"}>
            <div className={styles.comet} />
            <div className={styles.comet} />
            <div className={styles.comet} />
          </div>
        </>
      )}

      {!hidePlanets && (
        <>
          <Image
            width={132}
            height={132}
            alt="Planet Violet"
            src={PlanetViolet}
            className={
              "absolute top-[750px] left-[10%] size-32 -rotate-[25deg] p-5 bg-[radial-gradient(circle_at_50%_50%,rgba(0,148,255,0.25)_50%,transparent_65%)]"
            }
          />
          <div className={"absolute right-[10%] top-[150px] -rotate-[25deg]"}>
            <Image
              width={157}
              height={159}
              alt="Planet Yellow"
              src={PlanetYellow}
              className={styles.planet2Moon}
            />
            <Image
              width={213}
              height={213}
              alt="Planet Blue"
              src={PlanetBlue}
              className={styles.planet2}
            />
          </div>
        </>
      )}

      {!hideUfoSwarm && (
        <>
          <div className={styles.ufoSwarm}>
            <Image
              width={94}
              height={51}
              alt="ufo"
              src={Ufo1}
              className={styles.ufo}
            />
            <Image
              width={94}
              height={51}
              alt="ufo"
              src={Ufo2}
              className={styles.ufo}
            />
            <Image
              width={94}
              height={51}
              alt="ufo"
              src={Ufo3}
              className={styles.ufo}
            />
          </div>
        </>
      )}

      {!hideRocket && (
        <Image
          width={30}
          height={61}
          alt="rocket"
          src={Rocket}
          className={styles.rocket}
        />
      )}

      {!hideVehicle && (
        <Image
          width={86}
          height={61}
          alt="Space Electric Vehicle"
          src={SpaceElectricVehicle}
          className={styles.vehicle}
        />
      )}

      {children}
    </div>
  );
};

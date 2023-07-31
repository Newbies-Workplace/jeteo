import Image from "next/image";
import styles from "./Logo.module.scss";
import logo from "@/assets/planet.svg";
import cs from "classnames";
import React from "react";

interface LogoProps {
  invertColor?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ invertColor }) => {
  return (
    <div className={cs(styles.content, { [styles.invertColor]: invertColor })}>
      <Image alt="logo" src={logo} className={styles.logo} />
      <span className={styles.text}>jeteo</span>
    </div>
  );
};

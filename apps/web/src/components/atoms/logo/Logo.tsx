import Image from "next/image";
import styles from "./Logo.module.scss";
import logo from "@/assets/planet.svg";

interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <div className={styles.content}>
      <Image alt="logo" src={logo} className={styles.logo} />
      <span className={styles.text}>jeteo</span>
    </div>
  );
};

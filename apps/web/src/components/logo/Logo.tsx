import Image from "next/image"
import { Text } from "../text/Text"

import styles from "./Logo.module.scss"
import logo from "@/assets/planet.svg"


interface LogoProps {
    variant: "bodyS" | "bodyM" | "bodyL" | "headS" | "headM" | "headL" | "logo" | "logoM",
}


export const Logo: React.FC<LogoProps> = ({variant}) => {
    return (
        <div className={styles.content}>
            <Image
                alt="logo"
                src={logo}
                className={styles.logo}
            />
            <Text variant={variant}>
                jeteo
            </Text>
        </div>
    )
}
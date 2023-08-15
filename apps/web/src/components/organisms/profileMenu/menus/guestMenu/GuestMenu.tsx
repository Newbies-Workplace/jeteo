'use client'

import Button from "@/components/atoms/button/Button";
import styles from './GuestMenu.module.scss'
import { Text } from "@/components/atoms/text/Text";
import colors from "@/colors.module.scss";
import Image from "next/image";
import profilePicture from "@/assets/images/default-profile-pic.svg";
import menuStyles from "../menus.module.scss"
import Link from "next/link";



export default function GuestMenu() {
    return (
        <div className={styles.menu}>
            <div className={menuStyles.profile}>
                <Image alt="pfp" src={profilePicture} className={menuStyles.pfp} />
                <Text variant="headS" bold={true} className={menuStyles.text}> Gall anonim</Text>
            </div>
            
            <Link href={"/auth/signin"} style={{width: "90%"}}>
            <Button primary size="small" 
                style={{ 
                    borderRadius: "8px", 
                    backgroundColor: colors.white,
                    color: colors.black,
                    width: "100%",
                    
                }}>
                <Text variant="bodyM">
                    Zaloguj się
                </Text>
            </Button>
            </Link>
        </div>
    );
  }
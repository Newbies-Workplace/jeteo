'use client'

import Button from "@/components/atoms/button/Button";
import styles from './UserMenu.module.scss'
import { Text } from "@/components/atoms/text/Text";
import colors from "@/colors.module.scss";
import Image from "next/image";
import profilePicture from "@/assets/images/default-profile-pic.svg";
import Link from "next/link";
import { useAuth } from "@/contexts/Auth.hook";
import menuStyles from "../menus.module.scss"

export default function UserMenu() {
    const { user } = useAuth();

  
    return (
        <div className={styles.menu}>
            <div className={menuStyles.profile}>
                <Image alt="pfp" src={profilePicture} className={menuStyles.pfp} />
                <Text variant="headS" bold={true} className={menuStyles.text}>{user?.nick}</Text>
            </div>
            <div className={menuStyles.buttonContainer}>
                <Link href={"/studio/events"}>
                    <Button primary size="small" 
                        style={{ 
                            borderRadius: "8px", 
                            backgroundColor: colors.white,
                            color: colors.black,
                            width: "100%",
                            
                        }}>
                        <Text variant="bodyM">
                            Jeteo studio
                        </Text>
                    </Button>            
                </Link>                
                
                <Link href={"./"}>
                    <Button primary size="small" 
                        style={{ 
                            borderRadius: "8px", 
                            backgroundColor: colors.white,
                            color: colors.black,
                            width: "100%",
                            
                        }}>
                        <Text variant="bodyM">
                            Ustawienia
                        </Text>
                    </Button>            
                </Link>
                
                <Link href={"./"}>
                    <Button primary size="small" 
                        style={{ 
                            borderRadius: "8px", 
                            backgroundColor: colors.live,
                            color: colors.white,
                            width: "100%",
                            
                        }}>
                        <Text variant="bodyM">
                            Wyloguj
                        </Text>
                    </Button>            
                </Link>

            </div>
        </div>
    );
  }

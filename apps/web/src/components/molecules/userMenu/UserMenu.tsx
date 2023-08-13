'use client'

import Button from "@/components/atoms/button/Button";
import styles from './UserMenu.module.scss'
import { Text } from "@/components/atoms/text/Text";
import colors from "@/colors.module.scss";
import Image from "next/image";
import profilePicture from "@/assets/default-profile-picture.svg";
import Link from "next/link";
import { useAuth } from "@/contexts/Auth.hook";


export default function UserMenu() {
    const { user } = useAuth();

  
    return (
        <div className={styles.menu}>
            <div className={styles.profile}>
                <Image alt="Open menu" src={profilePicture} className={styles.burger} />
                <Text variant="headS" bold={true} className={styles.text}>{user?.nick}</Text>
            </div>
            <div className={styles.buttonContainer}>
                <Link href={"/studio/events"}>
                    <Button primary size="small" 
                        style={{ 
                            borderRadius: "8px", 
                            backgroundColor: colors.white,
                            color: colors.black,
                            width: "100%",
                            
                        }}>
                        <Text variant="bodyM" className={styles.title}>
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
                        <Text variant="bodyM" className={styles.title}>
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
                        <Text variant="bodyM" className={styles.title}>
                            Wyloguj
                        </Text>
                    </Button>            
                </Link>

            </div>
        </div>
    );
  }

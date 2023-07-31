import React from "react"
import styles from "./lectureCard.module.scss"
import { Card } from "./card/LecturePersonCard"
import { Text } from "@/components/text/Text"
import Image from "next/image"

import avatar from "@/assets/Rectangle 225.svg"
import time from "@/assets/Access time.svg"
import Link from "next/link"

interface LectureProps {
    startingHour: string,
    endingHour: string,
};


export const LectureCard: React.FC<LectureProps> = ({startingHour,endingHour}) => {

    const isAble: boolean = true;

    return (
        <div className={styles.content}>

            <div className={styles.timer}>
                <Image
                    alt="time" 
                    src={time}
                    width={16}
                    height={16}
                />
                <Text variant="headM">
                    {startingHour}-{endingHour}
                </Text>
            </div>

            <div className={styles.main}>  
                <div className={styles.titlecontainer}>
                    <Text variant="headS" bold>
                        Paraparapapa
                    </Text>
                    <Text variant="headS">
                        opowiem wam jak to jest byc dzbanem
                    </Text>
                </div>

                <div className={styles.persons}>
                    <Card 
                        image={avatar}
                        name="John Doe"
                        description="i like crocks"
                        mail="mail.google.com/mail/u/0/#inbox"
                        twitter="twitter.com/home?lang=pl"
                        linkedin="pl.linkedin.com"
                    />
                    <Card 
                        image={avatar}
                        name="John Doe"
                        description="i like crocks"
                        mail=""
                        twitter=""
                        linkedin=""
                    />
                </div>

                {isAble && 
                <Link href="/" className={styles.vote}>
                    <Text variant="headS" bold> 
                        Oceń prelekcję
                    </Text>
                    <p>*****</p>
                </Link>
                }
            </div>

            
            
        </div>
    )
}
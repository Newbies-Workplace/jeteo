import React from "react"
import styles from "./lectureCard.module.scss"
import { SpeakerCard } from "./SpeakerCard/SpeakerCard"
import { Text } from "@/components/text/Text"
import Image from "next/image"

import time from "@/assets/clock.svg"
import Link from "next/link"

interface LectureProps {
    startingHour: string,
    endingHour: string,

    title: string,
    subtitle: string,

    isAbletoRate: boolean,

    persons: any,
};


export const LectureCard: React.FC<LectureProps> = ({startingHour,endingHour,title,subtitle,isAbletoRate,persons}) => {

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
                        {title}
                    </Text>
                    <Text variant="headS">
                        {subtitle}
                    </Text>
                </div>

                <div className={styles.persons}>
                    {persons.map(item => {
                        return (
                            <SpeakerCard 
                                key={item.id}

                                image={item.imageURL}
                                name={item.name}
                                description={item.description}
                                mail={item.mail}
                                twitter={item.twitter}
                                linkedin={item.linkedIn}
                                github={item.github}
                            />
                        );
                    }
                    )}
                </div>

                {isAbletoRate && 
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
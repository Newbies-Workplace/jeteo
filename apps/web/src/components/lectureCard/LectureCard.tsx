import styles from "./lectureCard.module.scss"
import { Card } from "./card/Card"
import { Text } from "../text/Text"
import Image from "next/image"

import avatar from "@/assets/Rectangle 225.svg"
import time from "@/assets/Access time.svg"

interface LectureProps {
    startingHour: string,
    endingHour: string,
}


export const LectureCard: React.FC<LectureProps> = ({startingHour,endingHour}) => {
    return (
        <div className={styles.content}>

            <div className={styles.timer}>
                <Image
                    alt="time" 
                    src={time}
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
                        gmail={true}
                        twitter={true}
                        linkedin={true}
                    />
                    <Card 
                        image={avatar}
                        name="John Doe"
                        description="i like crocks"
                        gmail={false}
                        twitter={false}
                        linkedin={false}
                    />
                </div>
            </div>
            
        </div>
    )
}
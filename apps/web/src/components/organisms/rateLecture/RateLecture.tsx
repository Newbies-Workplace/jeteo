'use client'

import react from 'react';
import styles from "./RateLecture.module.scss"
import { SpeakerCard, SpeakerCardProps} from '@/components/molecules/lectureCard/SpeakerCard/SpeakerCard';
import { Text } from "@/components/atoms/text/Text";
import RateStars from '@/components/molecules/rateStars/RateStars';
import TextArea from '@/components/molecules/textArea/TextArea';
import Button from "@/components/atoms/button/Button";


export interface RateLectureProps{
    title: string;
    speakers: SpeakerCardProps[];
}

const RateLecture: React.FC<RateLectureProps> = ({
    title,
    speakers,
  }) => {

    return (
        <div className={styles.root}>
            <div className={styles.rateLecture}>
                <div className={styles.vertical}>
                    <Text variant="headS" bold>
                        {title}
                    </Text>
                    <div className={styles.horizontal}>
                        {speakers.map((speaker, index) => (
                            <SpeakerCard key={index} {...speaker} />
                        ))}
                    </div>
                    <div style={{width: "100%", height: "1.5px", backgroundColor: "#D9D9D9"}} />
                </div>
                <RateStars title={"Jak oceniasz prelekcję?"} subtitle={"(prezentacja, feeling, całokształt)"} />
                <RateStars title={"Jak oceniasz temat?"} subtitle={"(atrakcyjność tematu)"} />
                <TextArea title={"Opinia dla prelegenta"} />
                <div className={styles.buttonsWrapper}>
                    <Button size="medium" >
                        <Text variant="bodyL">Anuluj</Text>
                    </Button>                       
                    <Button size="medium" className={styles.rateButton} >
                        <Text variant="bodyL">Oceń</Text>
                    </Button>    
                </div>
            </div>
 
        </div>
    )
}

export default RateLecture;
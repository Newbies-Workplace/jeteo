'use client'

import react, { useState } from 'react';
import styles from "./RateLecture.module.scss"
import { SpeakerCard, SpeakerCardProps} from '@/components/molecules/lectureCard/SpeakerCard/SpeakerCard';
import { Text } from "@/components/atoms/text/Text";
import RateStars from '@/components/molecules/rateStars/RateStars';
import TextArea from './textArea/TextArea';
import Button from "@/components/atoms/button/Button";
import { Dialog } from '@/components/molecules/dialog/Dialog';
import colors from "@/colors.module.scss";



export interface RateLectureProps{
    title: string;
    speakers: SpeakerCardProps[];
    onDismiss: () => void;
}

const RateLecture: React.FC<RateLectureProps> = ({
    title,
    speakers,
    onDismiss 
  }) => {

    const [text, setText] = useState('');
    const [ratingOne, setRatingOne] = useState(0);
    const [ratingTwo, setRatingTwo] = useState(0);

    const confirm = () => {
        console.log(text);
        console.log(ratingOne);
        console.log(ratingTwo);
    }

    const handleDismiss = () => {
        onDismiss();
    };

    return (
        <div className={styles.root}>
            <div className={styles.rateLecture}>
                <div className={styles.vertical}>
                    <Text variant="headS" bold>
                        {title}
                    </Text>
                    <div className={styles.horizontal}>
                        {speakers.map((speaker) => (
                            <SpeakerCard key={speaker.name} {...speaker} />
                        ))}
                    </div>
                    <div style={{width: "100%", height: "1.5px", backgroundColor: colors.stroke}} />
                </div>
                <RateStars 
                    title={"Jak oceniasz prelekcję?"} 
                    subtitle={"(prezentacja, feeling, całokształt)"} 
                    rating={ratingOne} setRating={setRatingOne}
                />
                <RateStars 
                    title={"Jak oceniasz temat?"} 
                    subtitle={"(atrakcyjność tematu)"} 
                    rating={ratingTwo} setRating={setRatingTwo}
                />
                <TextArea title={"Opinia dla prelegenta"} text={text} setText={setText} />
                <div className={styles.buttonsWrapper}>
                    <Button size="medium" >
                        <Text variant="bodyL">Anuluj</Text>
                    </Button>                       
                    <Button size="medium" className={styles.rateButton} onClick={confirm} >
                        <Text variant="bodyL">Oceń</Text>
                    </Button>    
                </div>
            </div>
 
        </div>
    )
}

export default RateLecture;
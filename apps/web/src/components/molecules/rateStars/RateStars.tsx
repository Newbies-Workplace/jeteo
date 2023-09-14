'use client'
import React, { useState} from "react";
import Image from "next/image";
import star from "@/assets/star.svg";
import styles from "./RateStars.module.scss";
import { Text } from "@/components/atoms/text/Text";


export interface RateStarsProps {
    title: string,
    subtitle: string,
    rating: number,
    setRating: any,

}

const RateStars: React.FC<RateStarsProps> = ({
    title,
    subtitle,
    rating,
    setRating,

}) => {

    return (
        <div className={styles.container}>
          <Text variant="headS"> {title} </Text>
          <Text variant="bodyS"> {subtitle} </Text>
    
          <div className={styles.starsWrapper}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src={star}
                alt="star"
                className={`${styles.star} ${index < rating ? styles.activeStar : ""}`}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>
        </div>
      );
    };
    
    export default RateStars;
"use client";

import React from "react";
import Image from "next/image";
import star from "@/assets/star.svg";
import { Text } from "@/components/atoms/text/Text";
import { cn } from "@/lib/utils";

export interface RateStarsProps {
  title: string;
  subtitle: string;
  rating: number;
  setRating: (vote: number) => void;
}

const RateStars: React.FC<RateStarsProps> = ({
  title,
  subtitle,
  rating,
  setRating,
}) => {
  return (
    <div className={"flex flex-col justify-center items-center gap-2"}>
      <Text variant="headS"> {title} </Text>
      <Text variant="bodyS"> {subtitle} </Text>

      <div className={"flex gap-4"}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            key={index}
            src={star}
            alt="star"
            className={cn(
              "cursor-pointer select-none",
              index < rating &&
                "[filter:_invert(08%)_sepia(100%)_saturate(912%)_hue-rotate(342deg)_brightness(98%)_contrast(100%)]"
            )}
            onClick={() => setRating(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default RateStars;

import styles from "./Timer.module.scss";
import Image from "next/image";
import time from "@/assets/clock.svg";
import { Text } from "@/components/atoms/text/Text";
import React from "react";
import dayjs from "dayjs";

interface TimerProps {
  from: string;
  to: string;
}

export const Timer: React.FC<TimerProps> = ({ from, to }) => {
  return (
    <div className={styles.timer}>
      <Image alt="time" src={time} width={16} height={16} />
      <Text variant="headS">
        {dayjs(from).format("HH:mm")}- {dayjs(to).format("HH:mm")}
      </Text>
    </div>
  );
};

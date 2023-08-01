"use client";
import React from "react";
import styles from "./RateProgress.module.scss";

import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, ChartOptions, Legend } from "chart.js";
import { Text } from "@/components/atoms/text/Text";

ChartJS.register(ArcElement, Legend);

interface RateProgressProps {
  max: number;
  value: number;
  label?: string;
  description?: string;
}

export const RateProgress: React.FC<RateProgressProps> = ({
  max,
  value,
  label,
  description,
}) => {
  const data = {
    labels: ["Oceny"],
    datasets: [
      {
        label: "Średnia ocen",
        data: [value, max - value],
        backgroundColor: ["rgba(67,64,190, 1)", "rgba(196,196,196, 1)"],
        borderColor: ["rgba(67,64,190, 1)", "rgba(196,196,196, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    animation: {
      duration: 1000,
      easing: "easeInOutSine",
    },
    responsive: true,
    circumference: 180,
    rotation: 270,
    cutout: "85%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <Doughnut data={data} options={options} style={{ zIndex: 1 }} />
      </div>
      <div className={styles.textContainer}>
        <Text variant={"headL"} bold>
          {value.toFixed(2) + "/" + max}
        </Text>
        <Text variant={"headM"} bold>
          {label}
        </Text>
        <Text variant={"bodyS"} bold className={styles.description}>
          {description}
        </Text>
      </div>
    </div>
  );
};

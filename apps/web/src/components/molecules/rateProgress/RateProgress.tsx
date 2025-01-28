"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, ChartOptions, Legend } from "chart.js";
import { Text } from "@/components/atoms/text/Text";

ChartJS.register(ArcElement, Legend);

interface RateProgressProps {
  max: number;
  value: number;
  label?: string;
  description?: string;
  color: string;
}

export const RateProgress: React.FC<RateProgressProps> = ({
  max,
  value,
  label,
  description,
  color,
}) => {
  const data = {
    labels: ["Oceny"],
    datasets: [
      {
        label: "Średnia ocen",
        data: [value, max - value],
        backgroundColor: [color, "rgba(196,196,196, 1)"],
        borderColor: [color, "rgba(196,196,196, 1)"],
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
    <div
      className={
        "max-w-60 flex flex-col justify-center items-center text-center"
      }
    >
      <div className={"size-60"}>
        <Doughnut data={data} options={options} style={{ zIndex: 1 }} />
      </div>
      <div className={"-mt-[125px] flex flex-col gap-2"}>
        <Text variant={"headL"} bold>
          {value.toFixed(2) + "/" + max}
        </Text>
        <Text variant={"headM"} bold>
          {label}
        </Text>
        <Text variant={"bodyS"} bold className={"max-w-60 text-gray"}>
          {description}
        </Text>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import styles from "@/components/molecules/lectureRateBarChart/LectureRateBarChart.module.scss";
import colors from "@/colors.module.scss";

interface LectureRateBarChartProps {
  overallRatesCounts: { [key: number]: number }[];
  topicRatesCounts: { [key: number]: number }[];
}

Chart.register(CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip);

export const LectureRateBarChart: React.FC<LectureRateBarChartProps> = ({
  overallRatesCounts: overallRatesCounts,
  topicRatesCounts: topicRatesCounts,
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Ilość: ${context.parsed.y}`;
          },
          title: function (context) {
            return `Ocena: ${context[0].label}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: "Oceny",
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Ilość ocen",
        },
      },
    },
  };

  const data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Oceny prelekcji",
        data: overallRatesCounts?.map((rate) => Object.values(rate)[0]),
        backgroundColor: [`${colors.primary}`],
        borderColor: [`${colors.primary}`],
        borderWidth: 0,
        borderRadius: 8,
      },
      {
        label: "Oceny tematu",
        data: topicRatesCounts?.map((rate) => Object.values(rate)[0]),
        backgroundColor: [`${colors.success}`],
        borderColor: [`${colors.success}`],
        borderWidth: 0,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Bar data={data} options={options} />
    </div>
  );
};

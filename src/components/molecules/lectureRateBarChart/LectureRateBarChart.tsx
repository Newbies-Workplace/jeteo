"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart,
  type ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

interface LectureRateBarChartProps {
  overallRatesCounts: { [key: number]: number }[];
  topicRatesCounts: { [key: number]: number }[];
}

Chart.register(CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip);

export const LectureRateBarChart: React.FC<LectureRateBarChartProps> = ({
  overallRatesCounts: overallRatesCounts,
  topicRatesCounts: topicRatesCounts,
}) => {
  const style = window.getComputedStyle(document.body);
  const options: ChartOptions<"bar"> = {
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
        backgroundColor: style.getPropertyValue("--color-primary"),
        borderColor: style.getPropertyValue("--color-primary"),
        borderWidth: 0,
        borderRadius: 8,
      },
      {
        label: "Oceny tematu",
        data: topicRatesCounts?.map((rate) => Object.values(rate)[0]),
        backgroundColor: style.getPropertyValue("--color-success"),
        borderColor: style.getPropertyValue("--color-success"),
        borderWidth: 0,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className={"max-w-[800px]"}>
      <Bar data={data} options={options} />
    </div>
  );
};

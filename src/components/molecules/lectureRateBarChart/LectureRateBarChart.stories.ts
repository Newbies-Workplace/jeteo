import type { Meta, StoryObj } from "@storybook/react";
import { LectureRateBarChart } from "@/components/molecules/lectureRateBarChart/LectureRateBarChart";

const meta: Meta<typeof LectureRateBarChart> = {
  title: "Components/Molecules/LectureRateBarChart",
  component: LectureRateBarChart,
};

export default meta;

type Story = StoryObj<typeof LectureRateBarChart>;

export const Default: Story = {
  args: {
    overallRatesCounts: [{ 1: 12 }, { 2: 9 }, { 3: 15 }, { 4: 33 }, { 5: 27 }],
    topicRatesCounts: [{ 1: 3 }, { 2: 12 }, { 3: 8 }, { 4: 23 }, { 5: 44 }],
  },
};

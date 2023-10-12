import type { Meta, StoryObj } from "@storybook/react";
import { LectureRateAction } from "@/components/molecules/lectureCard/RateAction/LectureRateAction";

const meta: Meta<typeof LectureRateAction> = {
  title: "Components/Molecules/LectureCard/LectureRateAction",
  component: LectureRateAction,
};

export default meta;

type Story = StoryObj<typeof LectureRateAction>;

export const Default: Story = {};

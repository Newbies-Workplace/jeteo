import type { Meta, StoryObj } from "@storybook/react";
import { LectureCard } from "@/components/molecules/lectureCard/LectureCard";

const meta: Meta<typeof LectureCard> = {
  title: "Components/Molecules/LectureCard",
  component: LectureCard,
};

export default meta;

type Story = StoryObj<typeof LectureCard>;

export const Default: Story = {
  args: {
    from: "2023-10-11T06:39:00.000Z",
    to: "2023-10-11T07:39:00.000Z",
    title: "Prelekcja",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    speakers: [],
  },
};

export const WithSpeakers: Story = {
  args: {
    from: "2023-10-11T06:39:00.000Z",
    to: "2023-10-11T07:39:00.000Z",
    title: "Prelekcja",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    speakers: [
      {
        name: "Prelegent",
        jobTitle: "Developer",
      },
      {
        name: "Prelegent",
      },
      {
        name: "Prelegent",
        jobTitle: "Developer",
      },
    ],
  },
};

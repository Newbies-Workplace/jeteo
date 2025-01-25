import type { Meta, StoryObj } from "@storybook/react";
import { SmartLectureCard } from "@/components/molecules/lectureCard/LectureCard";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";
import dayjs from "dayjs";

const meta: Meta<typeof SmartLectureCard> = {
  title: "Components/Molecules/SmartLectureCard",
  component: SmartLectureCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SmartLectureCard>;

const now = dayjs();
const liveStart = now.subtract(1, "hour").toISOString();
const liveEnd = now.add(1, "hour").toISOString();
const freshStart = now.subtract(1, "day").toISOString();
const freshEnd = now.subtract(10, "hour").toISOString();
const archiveStart = now.subtract(3, "day").toISOString();
const archiveEnd = now.subtract(2, "day").toISOString();

const baseLecture: Omit<LectureResponse, "from" | "to"> = {
  id: "1",
  title: "Lecture Title",
  description: "Lecture Description",
  speakers: [],
  invites: [],
  youtubeVideoId: "dQw4w9WgXcQ",
  ratingSummary: {
    average: 4.5,
    count: 10,
    opinionCount: 10,
    overallAverage: 4.5,
    topicAverage: 4.5,
  },
  createdAt: now.toISOString(),
};

export const LiveLecture: Story = {
  render: () => (
    <SmartLectureCard
      lecture={{ ...baseLecture, from: liveStart, to: liveEnd }}
    />
  ),
};

export const FreshLecture: Story = {
  render: () => (
    <SmartLectureCard
      lecture={{ ...baseLecture, from: freshStart, to: freshEnd }}
    />
  ),
};

export const ArchiveLecture: Story = {
  render: () => (
    <SmartLectureCard
      lecture={{ ...baseLecture, from: archiveStart, to: archiveEnd }}
    />
  ),
};

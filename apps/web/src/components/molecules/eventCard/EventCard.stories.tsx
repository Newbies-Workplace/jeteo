import type { Meta, StoryObj } from "@storybook/react";
import { SmartEventCard } from "@/components/molecules/eventCard/EventCard";
import { EventResponse } from "shared/model/event/response/event.response";
import dayjs from "dayjs";

const meta: Meta<typeof SmartEventCard> = {
  title: "Components/Molecules/EventCard",
  component: SmartEventCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SmartEventCard>;

const now = dayjs();
const futureStart = now.add(1, "day").toISOString();
const futureEnd = now.add(2, "day").toISOString();
const liveStart = now.subtract(1, "hour").toISOString();
const liveEnd = now.add(1, "hour").toISOString();
const freshStart = now.subtract(1, "day").toISOString();
const freshEnd = now.subtract(10, "h").toISOString();
const archiveStart = now.subtract(3, "day").toISOString();
const archiveEnd = now.subtract(2, "day").toISOString();

const baseEvent: Omit<EventResponse, "from" | "to"> = {
  id: "1",
  title: "Event Title",
  slug: "event-title",
  description: "Event Description",
  subtitle: "Event Subtitle",
  host: {
    id: "1",
    jobTitle: "Job Title",
    description: "Description",
    socials: {
      github: null,
      linkedin: null,
      mail: null,
      twitter: null,
    },
    name: "Host Name",
    avatar: "https://via.placeholder.com/32",
  },
  address: {
    city: "City",
    place: "Place",
  },
  tags: ["Tag1", "Tag2"],
  primaryColor: "#50c640",
  ratingSummary: {
    average: 4.5,
    count: 10,
  },
  visibility: "PUBLIC",
  userId: "1",
  createdAt: now.toISOString(),
};

export const FutureEvent: Story = {
  render: () => (
    <SmartEventCard
      event={{ ...baseEvent, from: futureStart, to: futureEnd }}
    />
  ),
};

export const LiveEvent: Story = {
  render: () => (
    <SmartEventCard event={{ ...baseEvent, from: liveStart, to: liveEnd }} />
  ),
};

export const FreshEvent: Story = {
  render: () => (
    <SmartEventCard event={{ ...baseEvent, from: freshStart, to: freshEnd }} />
  ),
};

export const ArchiveEvent: Story = {
  render: () => (
    <SmartEventCard
      event={{ ...baseEvent, from: archiveStart, to: archiveEnd }}
    />
  ),
};

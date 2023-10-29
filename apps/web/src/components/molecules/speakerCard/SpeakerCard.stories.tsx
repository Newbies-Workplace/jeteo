import type { Meta, StoryObj } from "@storybook/react";
import { SpeakerCard } from "@/components/molecules/speakerCard/SpeakerCard";

const meta: Meta<typeof SpeakerCard> = {
  title: "Components/Molecules/SpeakerCard",
  component: SpeakerCard,
};

export default meta;

type Story = StoryObj<typeof SpeakerCard>;

export const Default: Story = {
  args: {
    name: "Kamil",
    jobTitle: "Developer",
  },
};

export const WithNoJobTitle: Story = {
  args: {
    name: "Kamil",
  },
};

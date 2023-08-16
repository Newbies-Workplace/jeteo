import type { Meta, StoryObj } from "@storybook/react";
import { SpeakerPicker } from "@/components/molecules/speakerPicker/SpeakerPicker";

const meta: Meta<typeof SpeakerPicker> = {
  title: "Components/Molecules/SpeakerPicker",
  component: SpeakerPicker,
};

export default meta;

type Story = StoryObj<typeof SpeakerPicker>;

export const Default: Story = {};

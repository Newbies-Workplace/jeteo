import type { Meta, StoryObj } from "@storybook/react";
import { SpeakerPicker } from "@/components/molecules/speakerPicker/SpeakerPicker";
import Profile from "@/assets/images/default-profile-pic.svg";

const meta: Meta<typeof SpeakerPicker> = {
  title: "Components/Molecules/SpeakerPicker",
  component: SpeakerPicker,
  argTypes: {
    onAddInvite: { action: "Add Invite" },
    onDeleteInvite: { action: "Delete Invite" },
    onDeleteSpeaker: { action: "Delete Speaker" },
  },
};

export default meta;

type Story = StoryObj<typeof SpeakerPicker>;

export const Default: Story = {
  args: {},
};

export const WithInvites: Story = {
  args: {
    invites: [
      { email: "prelegent1@test.test", name: "John Doe", link: "link" },
      { email: "prelegent2@test.test", name: "John Doe", link: "link2" },
    ],
    speakers: [],
  },
};

export const WithSpeakers: Story = {
  args: {
    invites: [],
    speakers: [
      { name: "Prelegent Jeden", avatar: Profile },
      { name: "Prelegent Dwa", avatar: Profile },
    ],
  },
};

export const WithAllData: Story = {
  args: {
    invites: [
      { email: "prelegent2@test.test", name: "John Doe", link: "link" },
    ],
    speakers: [{ name: "Prelegent Jeden", avatar: Profile }],
  },
};

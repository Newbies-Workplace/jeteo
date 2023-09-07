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
      {
        id: "uuid1-invite1",
        mail: "prelegent1prelegent1prelegent1prelegent1prelegent1prelegent1@test.test",
        name: "John Doe John Doe John Doe John Doe John Doe",
      },
      {
        id: "uuid1-invite2",
        mail: "prelegent2@test.test",
        name: "John Doe",
      },
    ],
    speakers: [],
  },
};

export const WithSpeakers: Story = {
  args: {
    invites: [],
    speakers: [
      // @ts-ignore
      { id: "uuid2-speaker1", name: "Prelegent Jeden", avatar: Profile },
      // @ts-ignore
      { id: "uuid2-speaker2", name: "Prelegent Dwa", avatar: Profile },
    ],
  },
};

export const WithAllData: Story = {
  args: {
    invites: [
      {
        id: "uuid3-invite1",
        mail: "prelegent2@test.test",
        name: "John Doe",
      },
    ],
    speakers: [
      // @ts-ignore
      { id: "uuid3-speaker1", name: "Prelegent Jeden", avatar: Profile },
    ],
  },
};

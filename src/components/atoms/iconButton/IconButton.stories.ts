import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "@/components/atoms/iconButton/IconButton";
import Add from "@/assets/add.svg";
import Delete from "@/assets/delete.svg";

const meta: Meta<typeof IconButton> = {
  title: "Components/Atoms/IconButton",
  component: IconButton,
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    icon: Add,
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    icon: Delete,
  },
};

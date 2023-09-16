import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@/components/atoms/avatar/Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Atoms/Avatar",
  component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    size: 64,
    src: "assets/sample.png",
  },
};

export const Big: Story = {
  args: {
    size: 256,
    src: "assets/sample.png",
  },
};

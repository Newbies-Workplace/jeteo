import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/atoms/button/Button";

const meta: Meta<typeof Button> = {
  title: 'Components/Atoms/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    children: 'Testowy przycisk',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Testowy przycisk',
  },
};

export const PrimarySmall: Story = {
  args: {
    primary: true,
    children: 'Testowy przycisk',
    size: 'small',
  },
};

export const SecondarySmall: Story = {
  args: {
    children: 'Testowy przycisk',
    size: 'small',
  },
};

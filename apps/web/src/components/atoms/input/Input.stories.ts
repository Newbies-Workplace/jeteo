import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/atoms/input/Input";

const meta: Meta<typeof Input> = {
  title: 'Components/Atoms/Input',
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    value: 'lorem ipsum',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const WithError: Story = {
  args: {
    error: 'Error message',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
};

export const WithRequiredLabel: Story = {
  args: {
    label: 'Label',
    required: true,
  },
};

export const Multiline: Story = {
  args: {
    label: 'Label',
    required: true,
    multiline: true,
  },
};

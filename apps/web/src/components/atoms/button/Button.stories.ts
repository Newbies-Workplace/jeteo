import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/atoms/button/Button";
import Google from "@/assets/google.svg";

const meta: Meta<typeof Button> = {
  title: "Components/Atoms/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    children: "Testowy przycisk",
  },
};

export const Secondary: Story = {
  args: {
    children: "Testowy przycisk",
  },
};

export const Outlined: Story = {
  args: {
    outlined: true,
    children: "Testowy przycisk",
  },
};

export const SignIn: Story = {
  args: {
    signIn: true,
    outlined: true,
    icon: Google,
    children: "Google",
    style: {
      paddingRight: 84, //todo Padding ustawiony w Button.module.scss a i tak nie działa przy użyciu
    },
  },
};

export const PrimarySmall: Story = {
  args: {
    primary: true,
    children: "Testowy przycisk",
    size: "small",
  },
};

export const SecondarySmall: Story = {
  args: {
    children: "Testowy przycisk",
    size: "small",
  },
};

export const OutlinedSmall: Story = {
  args: {
    outlined: true,
    children: "Testowy przycisk",
    size: "small",
  },
};

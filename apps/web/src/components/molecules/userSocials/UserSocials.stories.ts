import type { Meta, StoryObj } from "@storybook/react";
import { UserSocials } from '@/components/molecules/userSocials/UserSocials';

const meta: Meta<typeof UserSocials> = {
    title: "Components/Molecules/UserSocials",
    component: UserSocials,
};

export default meta;

type Story = StoryObj<typeof UserSocials>;

export const Default: Story = {
    args: {
        size: 20,
        direction: "row",
        socials: {
            mail: "exmple@gmail.com",
            github: "github.com",
            twitter: "twitter.pl",
            linkedin: "linkedin.pl",
        }
    },
};
export const Empty: Story = {
    args: {
        size: 20,
        direction: "row",
        socials: {}
    },
};
export const Invalid: Story = {
    args: {
        size: 20,
        direction: "row",
        socials: {
            mail: "exmple@gmail.com",
            //@ts-ignore
            invalid: "invalid data"
        }
    },
};

export const OnlyInvalid: Story = {
    args: {
        size: 20,
        direction: "row",
        socials: {
            //@ts-ignore
            invalid: "invalid data"
        }
    },
};
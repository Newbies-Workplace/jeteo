import type { Meta, StoryObj } from "@storybook/react";
import { UserSocials } from '@/components/molecules/userSocials/UserSocials';

const meta: Meta<typeof UserSocials> = {
    title: "Components/Molecules/UserSocials",
    component: UserSocials,
};

export default meta;

type Story = StoryObj<typeof UserSocials>;

export const Primary: Story = {
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
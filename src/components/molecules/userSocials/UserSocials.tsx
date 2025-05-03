import React from "react";
import Link from "next/link";
import EmailIcon from "@/assets/email.svg";
import TwitterIcon from "@/assets/twitter.svg";
import LinkedInIcon from "@/assets/linkedin.svg";
import GithubIcon from "@/assets/github.svg";
import { IconButton } from "@/components/atoms/iconButton/IconButton";

interface UserSocialsProps {
  size?: "medium" | "small";
  socials?: {
    mail?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface SocialData {
  icon: string;
  alt: string;
  hrefPrefix?: string;
}

const socialsData: {
  [key in keyof UserSocialsProps["socials"]]: SocialData;
} = {
  mail: {
    icon: EmailIcon,
    alt: "email",
    hrefPrefix: "mailto:",
  },
  github: {
    icon: GithubIcon,
    alt: "github",
  },
  linkedin: {
    icon: LinkedInIcon,
    alt: "linkedin",
  },
  twitter: {
    icon: TwitterIcon,
    alt: "twitter",
  },
};

export const UserSocials: React.FC<UserSocialsProps> = ({
  size = "medium",
  socials,
}) => {
  if (!socials) {
    return null;
  }

  const socialEntries = Object.entries(socials).filter(([key, _]) => {
    // @ts-ignore
    return !!socialsData[key];
  });

  if (socialEntries.length === 0) {
    return <></>;
  }

  return (
    <div className={"flex flex-row gap-2"}>
      {socialEntries.map(([key, href]) => {
        if (!href) return;

        // @ts-ignore
        const { icon, alt, hrefPrefix } = socialsData[key];
        return (
          <Link href={`${hrefPrefix || ""}${href}`} key={key}>
            <IconButton icon={icon} alt={alt} size={size} />
          </Link>
        );
      })}
    </div>
  );
};

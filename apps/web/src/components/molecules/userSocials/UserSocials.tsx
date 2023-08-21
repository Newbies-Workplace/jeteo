import React from "react";
import styles from "./UserSocials.module.scss";
import Link from "next/link";
import Image from "next/image";
import EmailIcon from "@/assets/email.svg";
import TwitterIcon from "@/assets/twitter.svg";
import LinkedinIcon from "@/assets/linkedin.svg";
import GithubIcon from "@/assets/github.svg";

interface UserSocialsProps {
  size?: number;
  direction?: "row" | "column";
  socials: {
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
  [key in keyof UserSocialsProps['socials']]: SocialData
} = {
  mail: {
    icon: EmailIcon,
    alt: 'email',
    hrefPrefix: 'mailto:'
  },
  github: {
    icon: GithubIcon,
    alt: 'github',
  },
  linkedin: {
    icon: LinkedinIcon,
    alt: 'linkedin'
  },
  twitter: {
    icon: TwitterIcon,
    alt: 'twitter'
  }
}

export const UserSocials: React.FC<UserSocialsProps> = ({
  size = 16,
  direction = "row",
  socials,
}) => {
  if (!socials) {
    return null; 
  }

  const socialEntries = Object.entries(socials).filter(([key, _]) => {
    return !!socialsData[key];
  });

  if (socialEntries.length === 0) {
    return <></>;
  }

  return (
    <div
      className={styles.socials}
      style={{
        flexDirection: direction,
      }}
    >
      {socialEntries.map(([key, href]) => {
        if (!href) return;

        const { icon, alt, hrefPrefix } = socialsData[key];

        return <Link href={`${hrefPrefix || ''}${href}`} key={key}>
          <Image alt={alt} src={icon} width={size} height={size}/>
        </Link>
      })}
    </div>
  );
};

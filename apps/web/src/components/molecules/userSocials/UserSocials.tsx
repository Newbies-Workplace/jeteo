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

export const UserSocials: React.FC<UserSocialsProps> = ({
  size = 16,
  direction = "row",
  socials: { mail, twitter, linkedin, github },
}) => {
  return (
    <div
      className={styles.socials}
      style={{
        flexDirection: direction,
      }}
    >
      {mail && (
        <Link href={`mailto:${mail}`}>
          <Image alt="email" src={EmailIcon} width={size} height={size} />
        </Link>
      )}
      {twitter && (
        <Link href={twitter}>
          <Image alt="twitter" src={TwitterIcon} width={size} height={size} />
        </Link>
      )}
      {linkedin && (
        <Link href={linkedin}>
          <Image alt="linkedin" src={LinkedinIcon} width={size} height={size} />
        </Link>
      )}
      {github && (
        <Link href={github}>
          <Image alt="github" src={GithubIcon} width={size} height={size} />
        </Link>
      )}
    </div>
  );
};

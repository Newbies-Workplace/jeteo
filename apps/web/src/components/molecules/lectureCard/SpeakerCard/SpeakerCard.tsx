import React from "react";
import styles from "./SpeakerCard.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Image from "next/image";
import Link from "next/link";
import EmailIcon from "@/assets/email.svg";
import TwitterIcon from "@/assets/twitter.svg";
import LinkedinIcon from "@/assets/linkedin.svg";
import GithubIcon from "@/assets/github.svg";
import DefaultAvatar from "@/assets/images/default-profile-pic.svg";

export interface SpeakerCardProps {
  avatar?: string;
  name: string;
  description?: string;
  mail: string | undefined;
  twitter: string | undefined;
  linkedin: string | undefined;
  github: string | undefined;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({
  avatar,
  name,
  description,
  mail,
  twitter,
  linkedin,
  github,
}) => {
  return (
    <div className={styles.card}>
      <Image
        src={avatar ?? DefaultAvatar}
        alt="profile"
        className={styles.img}
        width={32}
        height={32}
      />
      <div className={styles.info}>
        <Text variant="bodyS" bold>
          {name}
        </Text>

        {description && <Text variant="bodyS">{description}</Text>}

        <div className={styles.socials}>
          {mail && (
            <Link href={`mailto:${mail}`}>
              <Image alt="email" src={EmailIcon} className={styles.icon} />
            </Link>
          )}
          {twitter && (
            <Link href={twitter}>
              <Image alt="twitter" src={TwitterIcon} className={styles.icon} />
            </Link>
          )}
          {linkedin && (
            <Link href={linkedin}>
              <Image
                alt="linkedin"
                src={LinkedinIcon}
                className={styles.icon}
              />
            </Link>
          )}
          {github && (
            <Link href={github}>
              <Image alt="github" src={GithubIcon} className={styles.icon} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

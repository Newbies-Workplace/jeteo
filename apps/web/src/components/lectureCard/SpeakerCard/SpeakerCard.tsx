import React from "react"
import styles from "./SpeakerCard.module.scss"
import { Text } from "@/components/text/Text"
import Image from "next/image"
import Link from "next/link"

import emailicon from "@/assets/email.svg"
import twittericon from "@/assets/twitter.svg"
import linkedlinicon from "@/assets/linkedIn.svg"
import githubicon from "@/assets/github-small.svg"

interface SpeakerCardProps {
    image: any,
    name: string,
    description: string,
    mail: string | undefined,
    twitter: string | undefined,
    linkedin: string | undefined,
    github: string | undefined,
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({image,name,description,mail,twitter,linkedin,github}) => {
    return (
        <div className={styles.card}>
            <Image 
                src={image} 
                alt="profile"
                className="img"    
            />
            <div className={styles.info}>
                <Text 
                    variant="bodyS" bold
                    >
                        {name}
                </Text>
                <Text 
                    variant="bodyS"
                    >
                        {description}
                </Text>
                <div className={styles.socials}>
                    {mail && 
                        <Link 
                            href={`https://${mail}`}>
                            <Image 
                                alt="email" 
                                src={emailicon}
                                className={styles.icon}
                            />
                        </Link>
                    }
                    {twitter && 
                        <Link 
                            href={`https://${twitter}`}>
                            <Image 
                                alt="twitter" 
                                src={twittericon}
                                className={styles.icon}
                            />
                        </Link>
                    }
                    {linkedin && 
                        <Link 
                            href={`https://${linkedin}`}>
                            <Image 
                                alt="linkedin" 
                                src={linkedlinicon}
                                className={styles.icon}
                            />
                        </Link>
                    }
                    {github && 
                        <Link 
                            href={`https://${github}`}>
                            <Image 
                                alt="github" 
                                src={githubicon}
                                className={styles.icon}
                            />
                        </Link>
                    }
                    
                </div>
            </div>
            
        </div>
    )
}
import React from "react"
import styles from "./LecturePersonCard.module.scss"
import { Text } from "@/components/text/Text"
import Image from "next/image"
import Link from "next/link"

import emailicon from "@/assets/Email.svg"
import twittericon from "@/assets/Twitter.svg"
import linkedlinicon from "@/assets/LinkedIn.svg"

interface CardProps {
    image: string,
    name: string,
    description: string,
    mail: string | undefined,
    twitter: string | undefined,
    linkedin: string | undefined,
}

export const Card: React.FC<CardProps> = ({image,name,description,mail,twitter,linkedin}) => {
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
                            />
                        </Link>
                    }
                    {twitter && 
                        <Link 
                            href={`https://${twitter}`}>
                            <Image 
                                alt="twitter" 
                                src={twittericon}
                            />
                        </Link>
                    }
                    {linkedin && 
                        <Link 
                            href={`https://${linkedin}`}>
                            <Image 
                                alt="linkedin" 
                                src={linkedlinicon}
                            />
                        </Link>
                    }
                    
                </div>
            </div>
            
        </div>
    )
}
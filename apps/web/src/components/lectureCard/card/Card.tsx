import styles from "./Card.module.scss"
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
    gmail: boolean,
    twitter: boolean,
    linkedin: boolean,
}

export const Card: React.FC<CardProps> = ({image,name,description,gmail,twitter,linkedin}) => {
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
                    {gmail && 
                        <Link 
                            href="/https://www.google.com/intl/pl/gmail/about/">
                            <Image 
                                alt="email" 
                                src={emailicon}
                            />
                        </Link>
                    }
                    {twitter && 
                        <Link 
                            href="/https://www.google.com/intl/pl/gmail/about/">
                            <Image 
                                alt="twitter" 
                                src={twittericon}
                            />
                        </Link>
                    }
                    {linkedin && 
                        <Link 
                            href="/https://www.google.com/intl/pl/gmail/about/">
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
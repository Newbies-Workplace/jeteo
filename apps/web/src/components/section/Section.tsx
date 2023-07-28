import React from "react";
import styles from "./Section.module.scss";

interface SectionProps {
    title: string,
}

export const Section: React.FC<React.PropsWithChildren<SectionProps>> = ({title, children}) => {
    return (
        <div className={styles.container}>
            <div className={styles.sectionDecorator}>
                <div className={styles.dot}/>
                <div className={styles.line}/>
            </div>
            <div className={styles.sectionContent}>
                <span className={styles.title}>{title}</span>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    )
}
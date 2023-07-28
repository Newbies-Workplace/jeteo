import React from "react"
import styles from "./Text.module.scss"
import cs from "classnames"


interface TextCompProps  { 
    children: React.ReactNode
    variant: "bodyS" | "bodyM" | "bodyL" | "headS" | "headM" | "headL",
    bold?: boolean
}

export const Text: React.FC<TextCompProps> = ({variant, bold = false, children}) => {
    return (
        
        <span className={cs(styles[variant], {[styles.bold]: bold})}>{children}</span>
    )
}
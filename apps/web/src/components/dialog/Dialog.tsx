import { Logo } from "../logo/Logo"
import styles from "./Dialog.module.scss"
import { Text } from "@/components/text/Text"


interface DialogProps{
    title: string
}

export const Dialog: React.FC<React.PropsWithChildren<DialogProps>> = ({title,children}) => {
    return(
        <div className={styles.container}>
            <Logo/>
            <Text variant="headM">{title}</Text>
            {children}
        </div>
    )
}
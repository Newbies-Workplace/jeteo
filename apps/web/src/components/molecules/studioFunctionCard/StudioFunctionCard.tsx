import styles from "./FunctionCard.module.scss"
import { Text } from "@/components/atoms/text/Text"
import Link from "next/link"


interface StudioFunctionCardProps {
  title: string,
}

export const StudioFunctionCard: React.FC<StudioFunctionCardProps> = 
(
  {
    title
  }
) => {
  return (
    <Link href="#" className={styles.card}>
      <Text variant="headM" bold className={styles.title}>
        {title}
      </Text>
      <Text variant="headS" className={styles.title}>
        wydarzenie
      </Text>
    </Link>
  )
}
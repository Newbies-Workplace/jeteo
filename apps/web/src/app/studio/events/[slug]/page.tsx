import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader"
import { StudioFunctionCard } from "@/components/molecules/studioFunctionCard/StudioFunctionCard"
import { Text } from "@/components/atoms/text/Text"
import { LectureCard } from "@/components/molecules/lectureCard/LectureCard"
import styles from "./StudioEvent.module.scss"


export default function Page() {
  return (
    <div className={styles.content}>
      <StudioHeader 
         title="I like crocs"
      />
      <div className={styles.cards}>
        <StudioFunctionCard 
          title="Zobacz"
        />
        <StudioFunctionCard 
          title="Edytuj"
        />
        <StudioFunctionCard 
          title="Usuń"
        />
      </div>
      
      <Text variant="headL">
        Prelekcje
      </Text>

      <LectureCard
        startingHour="13:00"
        endingHour="14:00"
        title="Pogadajmy o Formule 1"
        subtitle="kto zatrzyma maxa verstappena?"
        speakers={[]}
      />
      <LectureCard
        startingHour="13:00"
        endingHour="14:00"
        title="Pogadajmy o Formule 1"
        subtitle="kto zatrzyma maxa verstappena?"
        speakers={[]}
      />
      <LectureCard
        startingHour="13:00"
        endingHour="14:00"
        title="Pogadajmy o Formule 1"
        subtitle="kto zatrzyma maxa verstappena?"
        speakers={[]}
      />

    </div>
  )
}
import { StudioLectureCard } from "@/components/molecules/studioLectureCard/StudioLectureCard";
import styles from "./page.module.scss";
import Button from "@/components/atoms/button/Button";

export default function Page() {
  return (
    <div className={styles.content}>
      <div className={styles.lectures}>
        <StudioLectureCard
          title={
            "Java kontra Python? Co jest mocniejsze? Nie wiesz? Ja też! Wpadaj na wydarzenia, a może się dowiesz!"
          }
          subtitle={
            "Prezentacja na temat Pythona i Java. Dlaczego Python jest mocniejszy? Dlaczego Java jest lepsza? Może C# jets lepszy? Nie było tutaj nic o C#, nic nie szkodzi. I tak tu nic o C# nie będzie"
          }
          speakers={[
            { name: "Jan Kowalski", description: "Python/Java Developer" },
            { name: "Jan Kowalski", description: "Python/Java Developer" },
          ]}
          from="2023-08-16T17:19:08.398Z"
          to="2023-08-16T17:19:08.398Z"
        />
        <StudioLectureCard
          title={
            "Java kontra Python? Co jest mocniejsze? Nie wiesz? Ja też! Wpadaj na wydarzenia, a może się dowiesz!"
          }
          subtitle={
            "Prezentacja na temat Pythona i Java. Dlaczego Python jest mocniejszy? Dlaczego Java jest lepsza? Może C# jets lepszy? Nie było tutaj nic o C#, nic nie szkodzi. I tak tu nic o C# nie będzie"
          }
          speakers={[
            { name: "Jan Kowalski", description: "Python Developer" },
            { name: "Jan Kowalski", description: "Java Developer" },
          ]}
          from="2023-08-16T17:19:08.398Z"
          to="2023-08-16T17:19:08.398Z"
        />
      </div>
      <div className={styles.buttons}>
        <Button>Dodaj</Button>
      </div>
    </div>
  );
}
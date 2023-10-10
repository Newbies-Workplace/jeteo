import { getLectureDetails } from "@/common/getLecture";
import { LectureDetailsResponse } from "shared/.dist/model/lecture/response/lecture.response";
import { Section } from "@/components/molecules/section/Section";
import styles from "./page.module.scss";
import { RateProgress } from "@/components/molecules/rateProgress/RateProgress";
import { StudioOpinion } from "@/components/molecules/studioOpinion/StudioOpinion";

export default async function Page({
  params,
}: {
  params: { lectureSlug: string };
}) {
  const lecture: LectureDetailsResponse = await getLectureDetails(
    params.lectureSlug
  );
  return (
    <div>
      <Section title={`Oceny (${lecture.ratingSummary.count})`}>
        {lecture.ratingSummary.count > 0 && (
          <div className={styles.ratingSummary}>
            <RateProgress
              max={5}
              value={lecture.ratingSummary.overallAverage}
              label={"prelekcja"}
              description={"Średnia ocena prelekcji"}
            />
            <RateProgress
              max={5}
              value={lecture.ratingSummary.topicAverage}
              label={"temat"}
              description={"Średnia ocena tematu"}
            />
          </div>
        )}
      </Section>
      <Section title={`Opinie (${lecture.ratingSummary.opinionCount})`}>
        <div className={styles.ratingsList}></div>
        {lecture.ratingSummary.opinionCount > 0 &&
          lecture.ratings.map((opinion) => (
            <StudioOpinion
              key={opinion.id}
              overallRate={opinion.overallRate}
              topicRate={opinion.topicRate}
              opinion={opinion.opinion}
            />
          ))}
      </Section>
    </div>
  );
}

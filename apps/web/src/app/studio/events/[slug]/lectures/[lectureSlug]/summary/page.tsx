import { getLectureDetails } from "@/common/getLecture";
import { LectureDetailsResponse } from "shared/.dist/model/lecture/response/lecture.response";
import { Section } from "@/components/molecules/section/Section";
import styles from "./page.module.scss";
import { RateProgress } from "@/components/molecules/rateProgress/RateProgress";
import { StudioOpinion } from "@/components/molecules/studioOpinion/StudioOpinion";
import { LectureRateBarChart } from "@/components/molecules/lectureRateBarChart/LectureRateBarChart";
import { Text } from "@/components/atoms/text/Text";

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
        <Text variant={"bodyL"}>Średnie oceny</Text>
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

        <Text variant={"bodyL"} style={{ marginTop: 50 }}>
          Ilość Ocen
        </Text>
        <LectureRateBarChart
          overallRatesCounts={[
            { 1: 12 },
            { 2: 9 },
            { 3: 15 },
            { 4: 33 },
            { 5: 27 },
          ]}
          topicRatesCounts={[
            { 1: 3 },
            { 2: 12 },
            { 3: 8 },
            { 4: 23 },
            { 5: 44 },
          ]}
        />
      </Section>
      <Section title={`Opinie (${lecture.ratingSummary.opinionCount})`}>
        <div className={styles.ratingsList}></div>
        {lecture.ratingSummary.opinionCount > 0 &&
          lecture.ratings
            .filter((rate) => rate.opinion)
            .map((rate) => (
              <StudioOpinion
                key={rate.id}
                overallRate={rate.overallRate}
                topicRate={rate.topicRate}
                opinion={rate.opinion}
              />
            ))}
      </Section>
    </div>
  );
}

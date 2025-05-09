import { getLectureDetails } from "@/lib/actions/get-lectures";
import { LectureDetailsResponse } from "@/lib/models/lecture.response";
import { Section } from "@/components/molecules/section/Section";
import { RateProgress } from "@/components/molecules/rateProgress/RateProgress";
import { StudioOpinion } from "@/components/molecules/studioOpinion/StudioOpinion";
import { LectureRateBarChart } from "@/components/molecules/lectureRateBarChart/LectureRateBarChart";

export default async function Page({
  params,
}: {
  params: Promise<{ lectureSlug: string }>;
}) {
  const { lectureSlug } = await params;
  const lecture: LectureDetailsResponse = await getLectureDetails(lectureSlug);

  return (
    <div>
      <Section title={`Oceny (${lecture.ratingSummary.count})`}>
        {lecture.ratingSummary.count > 0 && (
          <div className={"flex items-start gap-8 self-stretch justify-center"}>
            <RateProgress
              max={5}
              value={lecture.ratingSummary.overallAverage}
              label={"prelekcja"}
              description={"Średnia ocena prelekcji"}
              color={"--color-primary"}
            />
            <RateProgress
              max={5}
              value={lecture.ratingSummary.topicAverage}
              label={"temat"}
              description={"Średnia ocena tematu"}
              color={"--color-success"}
            />
          </div>
        )}
      </Section>
      <Section title={`Podział ocen`}>
        {lecture.ratingSummary.count > 0 && (
          <LectureRateBarChart
            overallRatesCounts={lecture.overallRatesCounts}
            topicRatesCounts={lecture.topicRatesCounts}
          />
        )}
      </Section>
      <Section title={`Opinie (${lecture.ratingSummary.opinionCount})`}>
        <div className={"flex flex-col items-start gap-4 self-stretch"}></div>
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

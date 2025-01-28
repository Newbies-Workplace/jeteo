import { EventLecturesForm } from "@/components/organisms/eventForm/lectures/EventLecturesForm";
import { getEventLectures } from "@/common/getLecture";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lectures = await getEventLectures(slug);

  return <EventLecturesForm eventSlug={slug} lectures={lectures} />;
}

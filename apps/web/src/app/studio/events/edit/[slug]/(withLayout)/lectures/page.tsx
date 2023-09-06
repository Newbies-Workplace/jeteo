import { EventLecturesForm } from "@/components/organisms/eventForm/lectures/EventLecturesForm";
import { getEventLectures } from "@/common/getLecture";

export default async function Page({ params }: { params: { slug: string } }) {
  const lectures = await getEventLectures(params.slug);

  return <EventLecturesForm eventSlug={params.slug} lectures={lectures} />;
}

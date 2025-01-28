import { getEvent } from "@/common/getEvent";
import { EventThemeForm } from "@/components/organisms/eventForm/theme/EventThemeForm";
import { EventResponse } from "shared/model/event/response/event.response";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event: EventResponse = await getEvent(slug);
  return <EventThemeForm event={event} />;
}

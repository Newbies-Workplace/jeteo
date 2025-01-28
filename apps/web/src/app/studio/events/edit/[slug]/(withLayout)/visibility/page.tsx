import { EventVisibilityForm } from "@/components/organisms/eventForm/visibility/EventVisibilityForm";
import { EventResponse } from "shared/model/event/response/event.response";
import { getEvent } from "@/common/getEvent";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event: EventResponse = await getEvent(slug);

  return <EventVisibilityForm event={event} />;
}

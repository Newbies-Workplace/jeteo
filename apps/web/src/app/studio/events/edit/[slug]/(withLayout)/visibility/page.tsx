import { EventVisibilityForm } from "@/components/organisms/eventForm/visibility/EventVisibilityForm";
import { EventResponse } from "shared/model/event/response/event.response";
import { getEvent } from "@/common/getEvent";

export default async function Page({ params }: { params: { slug: string } }) {
  const event: EventResponse = await getEvent(params.slug);

  return <EventVisibilityForm event={event} />;
}

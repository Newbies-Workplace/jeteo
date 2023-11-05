import { getEvent } from "@/common/getEvent";
import { EventThemeForm } from "@/components/organisms/eventForm/theme/EventThemeForm";
import { EventResponse } from "shared/model/event/response/event.response";

export default async function Page({params}: {params: {slug: string}}) {
  const event: EventResponse = await getEvent(params.slug);
  return <EventThemeForm event={event} />;
}

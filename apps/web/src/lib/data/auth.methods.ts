import { Event, EventVisibility, Invite } from "@prisma/client";
import { UpdateEventRequest } from "shared/model/event/request/updateEvent.request";
import { LectureDetails } from "./converters";
import { auth } from "@/lib/auth";

export const assertLectureReadAccess = async (
  lecture: LectureDetails,
  lectureType: "detailed" | "public"
) => {
  const session = await auth();
  const user = session?.user;

  const event = lecture.Event;

  if (
    event.visibility !== EventVisibility.PRIVATE &&
    lectureType === "public"
  ) {
    return;
  }

  if (
    user &&
    (lecture.Event.authorId === user.id ||
      lecture.Speakers.map((speaker) => speaker.id).includes(user.id!))
  ) {
    return;
  }

  throw "NotAllowedToReadLectureException";
};

export const assertLectureWriteAccess = async (lecture: LectureDetails) => {
  const session = await auth();
  const user = session?.user;

  if (
    user &&
    (lecture.Event.authorId === user.id ||
      lecture.Speakers.map((speaker) => speaker.id).includes(user.id!))
  ) {
    return;
  }

  throw "NotAllowedToEditEventException";
};

export const assertEventWriteAccess = async (event: Event) => {
  const session = await auth();
  const user = session?.user;

  if (user && event.authorId === user.id) {
    return;
  }

  throw "NotAllowedToEditEventException";
};

export const assertEventReadAccess = async (event: Event) => {
  const session = await auth();
  const user = session?.user;

  if (event.visibility !== EventVisibility.PRIVATE) {
    return;
  }

  if (user && event.authorId === user.id) {
    return;
  }

  throw "NotAllowedToReadEventException";
};

export const assertInviteWriteAccess = async (invite: Invite) => {
  const session = await auth();
  const user = session?.user;

  if (user?.google_mail === invite.mail) {
    return;
  }

  throw "NotAllowedToEditInviteException";
};

export const assertEventVisibilityAccess = async (updateEventRequest: {
  visibility?: EventVisibility;
}) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw "NotAllowedToCreatePublicEventException";
  }

  if (
    !user._permissions.isAuthorized &&
    updateEventRequest.visibility === "PUBLIC"
  ) {
    throw "NotAllowedToCreatePublicEventException";
  }
};

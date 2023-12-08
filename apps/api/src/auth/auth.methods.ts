import { TokenUser } from '@/auth/jwt/jwt.model';
import { Event, EventVisibility, Invite } from '@prisma/client';
import { LectureDetails } from '@/lecture/domain/lecture.types';
import { NotAllowedToEditEventException } from '@/auth/exceptions/NotAllowedToEditEventException';
import { NotAllowedToEditInviteException } from '@/auth/exceptions/NotAllowedToEditInviteException';
import { NotAllowedToReadLectureException } from '@/auth/exceptions/NotAllowedToReadLectureException';
import { UpdateEventRequest } from 'shared/model/event/request/updateEvent.request';
import { NotAllowedToCreatePublicEventException } from '@/auth/exceptions/NotAllowedToCreatePublicEventException';
import { NotAllowedToReadEventException } from '@/auth/exceptions/NotAllowedToReadEventException';

export const assertLectureReadAccess = (
  user: TokenUser | undefined,
  lecture: LectureDetails,
  lectureType: 'detailed' | 'public',
) => {
  const event = lecture.Event;

  if (
    event.visibility !== EventVisibility.PRIVATE &&
    lectureType === 'public'
  ) {
    return;
  }

  if (
    user &&
    (lecture.Event.authorId === user.id ||
      lecture.Speakers.map((speaker) => speaker.id).includes(user.id))
  ) {
    return;
  }

  throw new NotAllowedToReadLectureException();
};

export const assertEventWriteAccess = (
  user: TokenUser | undefined,
  event: Event,
) => {
  if (user && event.authorId === user.id) {
    return;
  }

  throw new NotAllowedToEditEventException();
};

export const assertEventReadAccess = (
  user: TokenUser | undefined,
  event: Event,
) => {
  console.log('user', user);
  if (event.visibility !== EventVisibility.PRIVATE) {
    return;
  }

  if (user && event.authorId === user.id) {
    return;
  }

  throw new NotAllowedToReadEventException();
};

export const assertInviteWriteAccess = (
  user: TokenUser | undefined,
  invite: Invite,
) => {
  if (user.google_mail === invite.mail) {
    return;
  }

  throw new NotAllowedToEditInviteException();
};

export const assertEventVisibilityAccess = (
  user: TokenUser,
  updateEventRequest: UpdateEventRequest,
) => {
  if (
    !user._permissions.isAuthorized &&
    updateEventRequest.visibility === 'PUBLIC'
  ) {
    throw new NotAllowedToCreatePublicEventException();
  }
};

import { TokenUser } from '@/auth/jwt/jwt.model';
import { Event, EventVisibility, Invite } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LectureDetails } from '@/lecture/domain/lecture.types';

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

  throw new HttpException(
    'User is not allowed to see this lecture',
    HttpStatus.FORBIDDEN,
  );
};

export const assertEventWriteAccess = (
  user: TokenUser | undefined,
  event: Event,
) => {
  if (user && event.authorId === user.id) {
    return;
  }

  throw new HttpException(
    'User is not allowed to edit this event',
    HttpStatus.FORBIDDEN,
  );
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

  throw new HttpException(
    'User is not allowed to see this event',
    HttpStatus.FORBIDDEN,
  );
};

export const assertInviteWriteAccess = (
  user: TokenUser | undefined,
  invite: Invite,
) => {
  if (user.google_mail === invite.mail) {
    return;
  }

  throw new HttpException(
    'User is not allowed to edit this invite',
    HttpStatus.FORBIDDEN,
  );
};

import { Lecture, Event, Invite, User } from '@prisma/client';

export type LectureDetails = Lecture & {
  Event: Event;
  Speakers: User[];
  Invites: Invite[];
};

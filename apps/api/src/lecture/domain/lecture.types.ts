import { Lecture, Event, Invite, User, Rate } from '@prisma/client';

export type LectureDetails = Lecture & {
  Event: Event;
  Speakers: User[];
  Invites: Invite[];
  Rate: Rate[];
};

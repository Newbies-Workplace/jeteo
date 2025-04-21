import { UserResponse } from "./user.response";
import { InviteResponse, InviteDetailsResponse } from "./invite.response";

export interface LectureResponse {
  id: string;
  slug: string;
  event: {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
  };
  title: string;
  description?: string;
  from: string;
  to: string;
  youtubeVideoId?: string;
  speakers: UserResponse[];
  invites: InviteResponse[];
  ratingSummary: {
    average: number;
    count: number;
    opinionCount: number;
    overallAverage: number;
    topicAverage: number;
  };
  createdAt: string;
}

export interface LectureDetailsResponse extends LectureResponse {
  invites: InviteDetailsResponse[];
  ratings: {
    id: string;
    overallRate: number;
    topicRate: number;
    opinion?: string;
    createdAt: string;
  }[];
  overallRatesCounts: { [key: number]: number }[];
  topicRatesCounts: { [key: number]: number }[];
}

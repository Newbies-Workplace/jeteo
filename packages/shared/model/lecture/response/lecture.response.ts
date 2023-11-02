import { DateTime } from "../../util";
import { UserResponse } from "../../user/response/user.response";
import {
  InviteResponse,
  InviteDetailsResponse,
} from "../../invite/response/inviteDetailsResponse";

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
  description: string;
  from: DateTime;
  to: DateTime;
  speakers: UserResponse[];
  invites: InviteResponse[];
  ratingSummary: {
    average: number;
    count: number;
    opinionCount: number;
    overallAverage: number;
    topicAverage: number;
  };
  createdAt: DateTime;
}

export interface LectureDetailsResponse extends LectureResponse {
  invites: InviteDetailsResponse[];
  ratings: {
    id: string;
    overallRate: number;
    topicRate: number;
    opinion: string;
    createdAt: DateTime;
  }[];
}

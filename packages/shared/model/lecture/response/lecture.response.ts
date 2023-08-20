import { DateTime } from "../../util";
import { UserResponse } from "../../user/response/user.response";
import {
  InviteResponse,
  StudioInviteResponse,
} from "../../invite/response/studioInviteResponse";

export interface LectureResponse {
  id: string;
  slug: string;
  eventId: string;
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
  _metadata: {
    canBeRated: boolean;
  };
}

export interface StudioLectureResponse extends LectureResponse {
  invites: StudioInviteResponse[];
  ratings: {
    id: string;
    overallRate: number;
    topicRate: number;
    opinion: string;
    createdAt: DateTime;
  }[];
}

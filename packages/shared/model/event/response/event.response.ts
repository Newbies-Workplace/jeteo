import { DateTime } from "../../util";
import { UserResponse } from "../../user/response/user.response";

export interface EventResponse {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  from: DateTime;
  to: DateTime;
  address?: {
    city: string;
    place: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  ratingSummary: {
    average: number;
    count: number;
  };
  tags: string[];
  primaryColor: string;
  coverImage?: string;
  visibility: "PRIVATE" | "HIDDEN" | "PUBLIC";
  host: UserResponse;
  userId: string;
  createdAt: DateTime;
}

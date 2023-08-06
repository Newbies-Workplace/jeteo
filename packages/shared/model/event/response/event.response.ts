import { DateTime } from "../../util";

export interface EventResponse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
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
  links: string[]; // todo change to name and href
  tags: string[];
  primaryColor: string;
  coverImage?: string;
  userId: string;
  createdAt: DateTime;
}
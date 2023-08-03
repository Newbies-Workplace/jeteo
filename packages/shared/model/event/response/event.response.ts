type DateTime = string;

export interface EventResponse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  from: DateTime;
  to: DateTime;
  address: {
    city: string;
    place: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  createdAt: DateTime;
  links: string[];
  tags: string[];
  primaryColor: string;
  coverImage?: string;
  userId: string;
}

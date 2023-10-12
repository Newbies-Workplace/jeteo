export interface UserResponse {
  id: string;
  name: string;
  avatar: string | null;
  jobTitle: string | null;
  description: string | null;
  socials: {
    mail: string | null;
    github: string | null;
    twitter: string | null;
    linkedIn: string | null;
  };
}
